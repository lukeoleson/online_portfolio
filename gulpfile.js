// this file will create all these folders, compile the scss to css and move it all to our src folder.
// So if we want to write css, we do it in our scss file (scss/style.scss), and then it gets compiled into the css file by this gulpfile. 
// I think now you just go to this folder in teh cmd-line and do npm start, which I think will create all your folders and run your scripts. 
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

// Compile sass and inject into browswer
gulp.task('sass', function(){
    // this is an array of paths to all the sass files we want to compile
    // bootstrap.scss is a file in the bootstrap folder that contains all 
    // the different sass modules
    // pipe(sass()) is the function that actually compiles these
    // pipe(gulp.dest("src/css")) is where we want the files
    // pipe(browserSync.stream()) I imagine this makes it do this all live
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'scss/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.stream());
});

// Move JS files to src/js 
gulp.task('js', function(){
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
    .pipe(gulp.dest('src/js'))
    .pipe(browserSync.stream());
})

// watch sass and serve
gulp.task('serve', ['sass'], function(){
    browserSync.init({
        server: './src'
    });

    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'scss/*.scss'], ['sass']);
    gulp.watch('src/*.html').on('change', browserSync.reload);
});

// Move fonts folder to src
gulp.task('fonts', function(){
    return gulp.src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest('src/fonts'));
});

// Move fonts awesome css to src/css
gulp.task('fa', function(){
    return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
    .pipe(gulp.dest('src/css'));
});

// default gulp task (so when we run gulp it runs all the things we need)
gulp.task('default', ['js', 'serve', 'fa', 'fonts']);