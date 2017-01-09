/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

'use strict';

const gulp = require('gulp');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const compilerPackage = require('google-closure-compiler');

const closureCompiler = compilerPackage.gulp();

gulp.task('custom-elements', () =>
  gulp.src('./src/custom-elements.js', {base: './'})
      .pipe(sourcemaps.init())
      .pipe(closureCompiler({
          compilation_level: 'ADVANCED',
          warning_level: 'VERBOSE',
          language_in: 'ECMASCRIPT6_STRICT',
          language_out: 'ECMASCRIPT5_STRICT',
          externs: ['externs/html5.js', 'externs/custom-elements.js'],
          js_output_file: 'custom-elements.min.js',
          new_type_inf: true,
          rewrite_polyfills: false,
        }))
      .pipe(sourcemaps.write('/'))
      .pipe(gulp.dest('./'))
);

gulp.task('native-shim', () =>
  gulp.src('./src/native-shim.js')
      .pipe(rename('native-shim.min.js'))
      .pipe(sourcemaps.init())
      .pipe(babel({
          presets: ['babili'],
          comments: false,
        }))
      .pipe(sourcemaps.write('/'))
      .pipe(gulp.dest('./'))
);

gulp.task('default', ['custom-elements', 'native-shim']);
