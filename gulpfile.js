let gulp = require('gulp'), // Подключаем Gulp
    sass = require('gulp-sass'), //Подключаем Sass пакет,
    browserSync = require('browser-sync'), // Подключаем Browser Sync
    concat = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
    uglify = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
    cssnano = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
    rename = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
    del = require('del'), // Подключаем библиотеку для удаления файлов и папок
    pngquant = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
    cache = require('gulp-cache'), // Подключаем библиотеку кеширования
    autoprefixer = require('gulp-autoprefixer'),// Подключаем библиотеку для автоматического добавления префиксов
    imageop = require('gulp-image-optimization'), // для сжатия картинок
    rigger = require('gulp-rigger'); // модуль для импорта содержимого одного файла в другой

gulp.task('sass', function () { // Создаем таск Sass
    return gulp.src('src/scss/**/*.sass') // Берем источник
        .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true})) // Создаем префиксы
        .pipe(gulp.dest('src/css')) // Выгружаем результата в папку app/css
        .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

gulp.task('browser-sync', function () { // Создаем таск browser-sync
    browserSync({ // Выполняем browserSync
        server: { // Определяем параметры сервера
            baseDir: 'src' // Директория для сервера - app
        }
    });
});

gulp.task('scripts', function () {
    return gulp.src([
        "node_modules/jquery/dist/jquery.min.js",
        "node_modules/bootstrap/dist/js/bootstrap.min.js",
        "node_modules/swiper/swiper-bundle.min.js",
        "node_modules/jquery-mask-plugin/dist/jquery.mask.min.js",
        "src/js/script.js"
    ])    // Скрипты которые нужно будет собрать в кучу
        .pipe(concat("libs.min.js"))
        .pipe(gulp.dest('src/js'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('code', function () {
    return gulp.src('src/*.html')
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('css-libs', function () {
    return gulp.src('src/scss/libs.scss') // Выбираем файл для минификации
        .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(cssnano()) // Сжимаем
        .pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
        .pipe(gulp.dest('src/css')); // Выгружаем в папку app/css
});

gulp.task('clean', async function () {
    return del.sync('dist'); // Удаляем папку dist перед сборкой
});

gulp.task('img', function (cb) {
    return gulp.src('src/**/*.+(png|jpg|gif|jpeg)').pipe(imageop({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    })).pipe(gulp.dest('dist/img')).on('end', cb).on('error', cb);
    // Выгружаем на продакшен
});

gulp.task('prebuild', async function () {
    let buildCss = gulp.src([ // Переносим библиотеки в продакшен
        'src/css/style.css',
    ])
        .pipe(gulp.dest('dist/css'))

    let buildFonts = gulp.src('src/fonts/**/*') // Переносим шрифты в продакшен
        .pipe(gulp.dest('dist/fonts'))

    let buildImg = gulp.src('src/img/**/*') // Переносим шрифты в продакшен
        .pipe(gulp.dest('dist/img'))

    let buildVideos = gulp.src('src/videos/**/*') // Переносим шрифты в продакшен
        .pipe(gulp.dest('dist/videos'))

    let buildTerms = gulp.src('src/terms/**/*') // Переносим шрифты в продакшен
        .pipe(gulp.dest('dist/terms'))

    let buildPolicy = gulp.src('src/policy/**/*') // Переносим шрифты в продакшен
        .pipe(gulp.dest('dist/policy'))

    let buildPhpmailer = gulp.src('src/phpmailer/**/*') // Переносим шрифты в продакшен
        .pipe(gulp.dest('dist/phpmailer'))

    let buildIco = gulp.src('src/*.ico') // Переносим ico в продакшен
        .pipe(gulp.dest('dist'));

    let buildPhp = gulp.src('src/*.php') // Переносим php в продакшен
        .pipe(gulp.dest('dist'));

    let buildMainCss = gulp.src('src/*.css') // Переносим php в продакшен
        .pipe(gulp.dest('dist'));

    let buildJs = gulp.src([
        "node_modules/jquery/dist/jquery.min.js",
        "node_modules/bootstrap/dist/js/bootstrap.min.js",
        "node_modules/swiper/swiper-bundle.min.js",
        "node_modules/jquery-mask-plugin/dist/jquery.mask.min.js",
        "src/js/script.js"
    ])    // Скрипты которые нужно будет собрать в кучу
        .pipe(concat("libs.min.js"))

        .pipe(gulp.dest('dist/js'))

    let buildHtml = gulp.src('src/*.html') // Переносим HTML в продакшен
        .pipe(gulp.dest('dist'));

});

gulp.task('clear', function (callback) {
    return cache.clearAll();
})

gulp.task('watch', function () {
    gulp.watch('src/scss/**/*.sass', gulp.parallel('sass')); // Наблюдение за sass файлами
    gulp.watch('src/*.html', gulp.parallel('code')); // Наблюдение за HTML файлами в корне проекта
    gulp.watch('src/js/script.js', gulp.parallel('scripts')); // Наблюдение за главным JS файлом и за библиотеками
});
gulp.task('default', gulp.parallel('sass', 'browser-sync', 'watch', "scripts"));
// gulp.task('build', gulp.parallel('prebuild', 'clean', 'sass', 'scripts'));
gulp.series("prebuild", gulp.parallel('prebuild', 'clean', 'sass', 'scripts'));
