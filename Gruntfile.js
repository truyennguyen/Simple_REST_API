'use strict';

module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-simple-mocha');
	grunt.registerTask('test', ['jshint:dev', 'simplemocha:yellowbrickroad']);
	grunt.registerTask('default', ['test']);
	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.initConfig({
		jshint: {
			dev: {
				src: ['Gruntfile.js', '*.js', 'test/*.js']
			},
			options: {
				jshintrc: '.jshintrc'
			}
		},
		simplemocha: {
	    yellowbrickroad: { 
	    	src: ['test/*.js'] 
	    	},
		    options: {
		      node: true
		    }
		},
		watch: {
		  scripts: {
		    files: ['Gruntfile.js', '*.js', 'test/*.js'],
		    tasks: ['test'],
		    options: {
		    },
		  },
		},
	});

	grunt.event.on('watch', function(action, filepath, target) {
		grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
	});

};
