// 二哲 - 2016年08月15日10:56:05
const path = require('path');
const gulp = require('gulp');
const ugjs = require('gulp-uglify');
const webpack = require('webpack-stream');
const named = require('vinyl-named');
const del = require('del');
const watchPath = require('gulp-watch-path');
const replace = require('gulp-replace');
// const revAppend = require('gulp-rev-append');
const rev = require('gulp-rev');
const ifElse = require('gulp-if-else');
const htmlreplace = require('gulp-html-replace');
const browserSync = require('browser-sync').create();
const base64 = require('gulp-base64');
const runSequence = require('run-sequence');
const inlinesource = require('gulp-inline-source');
const bsReload = browserSync.reload;
const postcss = require('gulp-postcss'); //postcss本身
const autoprefixer = require('autoprefixer');
const precss = require('precss'); //提供像scss一样的语法
const cssnano = require('cssnano');  //更好用的css压缩!
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const revCollector = require('gulp-rev-collector');
const exec = require('child_process').exec;

const webpackConfig = {
    resolve: {
        root: path.join(__dirname, 'node_modules'),
        extensions: ['', '.js', '.vue', '.scss', '.css']
    },
    output: {
        publicPath: '/static/',
		filename: 'es6/[name]'
	},
    module: {
        loaders: [
            {test: /\.vue$/, loader: 'vue'},
            {test: /\.js$/, loader: 'babel', exclude: /node_modules/},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'url',
				query: {
					limit: 500,
					name: 'images/[name].[ext]?[hash:10]'
				}
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'url',
				query: {
					limit: 1,
					name: 'fonts/[name].[hash:7].[ext]'
				}
			}
        ]
    },
    babel: { //配置babel
        "presets": ["es2015",'stage-2'],
        "plugins": ["transform-runtime"]
    }
};
const processes = [
    autoprefixer({browsers: ['last 2 version', 'safari 5', 'opera 12.1', 'ios 6', 'android 4', '> 10%']}),
    precss,
    cssnano
];
// background: color($blue blackness(20%));  precss为了用这样的语法
const src = {
    css: './src/static/css/**/*.css',
    es6: './src/static/es6/**/*.js',
    ifonts: './src/static/ifonts/**/*.{eot,svg,ttf,woff}',
    images: './src/static/images/**/*.{png,jpg,jpeg}',
    js: './src/js/**/*.js',
    sass: './src/sass/**/*.scss',
    components: './src/components/**/*.vue',
    views: './src/views/**/*.html'
};
const dist = {
    css: './public/static/css/',
    es6: './public/static/es6/',
    ifonts: './public/static/ifonts/',
    images: './public/static/images/',
    js: './public/static/js/',
    sass: './public/static/sass/',
    views: './public/views'
};

var BUILD = 'DEV';

gulp.task('css:dev', function () {

    return gulp.src(src.css)
		.pipe(gulp.dest(dist.css));
});
gulp.task('css:build', function () {
    return gulp.src(src.css)
		.pipe(base64({
			extensions: ['png', /\.jpg#datauri$/i],
			maxImageSize: 10 * 1024 // bytes,
		}))
        .pipe(ifElse(BUILD === 'PUBLIC', function () {
            return postcss(processes)
        }))
        .pipe(rev())
        .pipe(gulp.dest(dist.css))
        .pipe(rev.manifest())
        .pipe(gulp.dest(dist.css))

});
gulp.task('sass', function () {
    return gulp.src(src.sass)
		.pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(processes))
		.pipe(replace('/static', ''))
		.pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./src/static/css/'));
});
gulp.task('js', function () {
	
	gulp.watch([src.js], function (event) {
		var paths = watchPath(event, src.js, './src/static/es6/');
		compileJS(paths.srcPath);
	})

});
gulp.task('component', function () {
	
	gulp.watch(['./src/components/**/*.vue'], function (event) {
		var business = event.path.split('/').slice(-2);
		var jsFile   = business[1].split('-')[0];
		var path;
		if (business[0] === 'common') {
			path = ['./src/js/**/*.js','!./src/js/lib/*.js'];
			cp('./src/js/lib/*.js','./src/static/es6/lib');
			cp('./src/js/lib/*.js','./public/static/es6/lib');
		} else if (business[0] === jsFile) {
			path = './src/js/'+ business[0] +'/*.js';
		} else {
			path = './src/js/' + business[0] + '/' + jsFile + '.js';
		}
		compileJS(path);
	})
	
});
gulp.task('clean', function () {
    del([
        'public/static/es6/**/*',
        'public/static/css/**/*'
    ]);
});
gulp.task('ugjs', function () {
    return gulp.src(src.es6)
        .pipe(ifElse(BUILD === 'PUBLIC', ugjs))
        .pipe(rev())
        .pipe(gulp.dest(dist.es6))
        .pipe(rev.manifest())
        .pipe(gulp.dest(dist.es6))
});

gulp.task('views:build', function () {
    return gulp.src(['./public/**/*.json', src.views])
        .pipe(revCollector({
            replaceReved: true
        }))
        .pipe(ifElse(BUILD === 'PUBLIC', inlinesource))
        .pipe(htmlreplace({
            js: {
                src: '',
                tpl: ''
            }, dev: {
                src: '',
                tpl: '<script>var DEV = false;</script>'
            }
        }))
        .pipe(replace('../../', 'YourCDNLink'))
        .pipe(replace('../', 'YourCDNLink'))
        .pipe(gulp.dest(dist.views));
}); 
gulp.task('views', function () {
    return gulp.src(src.views)
        .pipe(gulp.dest(dist.views));
});
gulp.task('reload', function () {
    browserSync.init(src.views, {
        startPath: "/views/",
        server: {
        	baseDir : ['./src']
		},
        notify: false
    });
    //gulp.watch([csasspath],['collegesass']);
    gulp.watch([src.sass]).on('change', function () {
        runSequence('sass', 'css:dev', function () {
            bsReload();
        });
    });
    gulp.start('js', 'component');
    gulp.watch([src.views], ['views']).on('change', bsReload);

});
gulp.task('images', function () {
    gulp.src(src.images)
        .pipe(gulp.dest(dist.images));
});
gulp.task('ifonts', function () {
    return gulp.src(src.ifonts)
        .pipe(gulp.dest(dist.ifonts));
});
gulp.task('build', function () {
    BUILD = 'PUBLIC';

    runSequence('clean', 'css:build', 'ugjs', 'views:build', 'images', 'ifonts',function() {
    	// 上传静态资源文件到CDN
        /*exec('node upload.js', function (err, output) {
            if(err) console.log(err);
            console.log(output);
        });*/
    });
});

function compileJS(path) {
	// console.log(path);
	return gulp.src(path)
	.pipe(named(function (file) {
		var history = JSON.parse(JSON.stringify(file)).history[0];
		return history.split('/js/')[1];
	}))
	.pipe(webpack(webpackConfig))
	.pipe(browserSync.reload({
		stream: true
	}))
	.pipe(gulp.dest('./src/static'))
	.pipe(gulp.dest('./public/static'))
}
function cp(from,to) {
	gulp.src(from)
		.pipe(gulp.dest(to))
}