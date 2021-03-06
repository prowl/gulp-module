'use strict';

var gulp = null;
var config = null;

function setupGulp(gulpRef, conf) {
  gulp = gulpRef;
  config = conf;

  require('gulp-help')(gulp);

  // setup our dev task
  defineDev();

  // setup our build task
  defineBuild();

  // setup our lint task
  defineLint();

  // setup our complexity task
  defineComplexity();

  // setup our test task
  defineTest();
}

/**
 * Our default dev task
 */
function devTask() {
  console.log('Dev Task Finished');
}

/**
 * Sets up the default dev task and its dependencies
 * @param {Object} gulp The gulp object to attach the task to
 */
function defineDev() {
  gulp.task('dev', 'Development Workflow', devTask);
}

/**
 * Our default test Task
 */
function testTask() {
  console.log('Tests Finished');
}

function defineTest() {
  require('gulp-module-unit-tests')(gulp, config);
  require('gulp-module-coverage')(gulp, config);

  gulp.task('test', 'Runs tests against the code', [
    'unit',
    'checkCoverage'
  ], testTask);
}

/**
 * Our default build task
 */
function buildTask() {
  console.log('Build Task Finished');
}

/**
 * Sets up the default build task and its dependencies
 *
 * @param {Object} gulp The gulp object to attach the task to
 * @param {Object} conf The configuration options
 */
function defineBuild() {
  require('gulp-module-changelog')(gulp, config);
  require('gulp-module-todos')(gulp, config);
  require('gulp-module-contrib')(gulp, config);
  require('gulp-module-docs')(gulp, config);

  gulp.task('build', 'Workflow to build the module', [
    'lint',
    'complexity',
    'test',
    'changelog',
    'todo',
    'contrib',
    'docs'
  ], buildTask);
}

/**
 * The default lint task
 */
function lintTask() {
  console.log('Finished Linting');
}

/**
 * Sets up the default lint task and its dependencies
 *
 * @param {Object} gulp The gulp instance to attach the tasks to
 * @param {Object} conf The configuration options
 */
function defineLint() {
  require('gulp-module-soften')(gulp, config);
  require('gulp-module-jsvalidate')(gulp, config);
  require('gulp-module-jshint')(gulp, config);
  require('gulp-module-jscs')(gulp, config);
  require('gulp-module-jscpd')(gulp, config);

  gulp.task('lint', 'Lints your source files', [
    'soften',
    'jsvalidate',
    'jshint',
    'jscpd',
    'jscs'
  ], lintTask);
}

/**
 * The default complexity task
 */
function complexityTask() {
  console.log('Complexity Report Finished');
}

/**
 * Sets up the default complexity task and its dependencies
 *
 * @param {Object} gulp The gulp task to attach the tasks to
 * @param {Object} conf The configuration options
 */
function defineComplexity() {
  require('gulp-module-size')(gulp, config);
  require('gulp-module-complexity')(gulp, config);
  require('gulp-module-plato')(gulp, config);
  require('gulp-module-escomplex')(gulp, config);
  require('gulp-module-cost')(gulp, config);

  gulp.task('complexity', 'Generates Complexity Report', [
    'size',
    'comp',
    'plato',
    'escomplex',
    'cost'
  ], complexityTask);
}

module.exports = setupGulp;
