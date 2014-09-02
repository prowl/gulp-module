'use strict';

var should = require('should'); //jshint ignore:line
var gulpLib = require('../lib/gulp');

var gulpMock = {};
gulpMock.tasks = [];

gulpMock.task = function(name, deps, func) {
  var task = {};
  task.name = name;
  task.deps = deps;
  task.func = func;

  normalizeTask(task);

  gulpMock.tasks.push(task);
};

function normalizeTask(task) {
  if (!task.func) {
    task.func = task.deps;
    task.deps = null;
  }
}

var configMock = {
  root: __dirname,
  soften: ['**/*.js', '**/*.json', '!./node_modules/**', '!./docs/**'],
  src: ['**/*.js', '!./node_modules/**', '!./docs/**'],
  specs: ['specs/**/*.js'],
  statements_threshold: 90,
  functions_threshold: 100,
  branches_threshold: 100,
  lines_threshold: 80
};

gulpLib(gulpMock, configMock);

describe('gulpLibrary', function() {
  it('Should return a function', function() {
    gulpLib.should.be.type('function');
  });

  it('Should setup the tasks', function() {
    gulpMock.should.have.property('tasks').property('length').greaterThan(0);
  });

  it('Should have a dev task', function() {
    gulpMock.tasks.forEach(function(obj) {
      if (obj.name === 'dev') {
        obj.func.should.be.type('function');
        obj.func();
      }
    });
  });

  it('Should have a task build', function() {
    gulpMock.tasks.forEach(function(obj) {
      if (obj.name === 'build') {
        obj.func.should.be.type('function');
        obj.func();
      }
    });
  });

  it('Should have a task lint', function() {
    gulpMock.tasks.forEach(function(obj) {
      if (obj.name === 'lint') {
        obj.func.should.be.type('function');
        obj.func();
      }
    });
  });

  it('Should have a task complexity', function() {
    gulpMock.tasks.forEach(function(obj) {
      if (obj.name === 'complexity') {
        obj.func.should.be.type('function');
        obj.func();
      }
    });
  });

  it('Should have a task test', function() {
    gulpMock.tasks.forEach(function(obj) {
      if (obj.name === 'test') {
        obj.func.should.be.type('function');
        obj.func();
      }
    });
  });
});
