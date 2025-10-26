// brush: "diff" aliases: ["patch"]

//	This file is part of the "jQuery.Syntax" project, and is distributed under the MIT License.
//	Copyright (c) 2011 Samuel G. D. Williams. <http://www.oriontransfer.co.nz>
//	See <jquery.syntax.js> for licensing details.

Syntax.register('diff', function (brush) {
	language.push({pattern: /^\+\+\+.*$/m, type: 'add'});
	language.push({pattern: /^\-\-\-.*$/m, type: 'del'});

	language.push({pattern: /^@@.*@@/m, type: 'offset'});

	language.push({pattern: /^\+[^\+]{1}.*$/m, type: 'insert'});
	language.push({pattern: /^\-[^\-]{1}.*$/m, type: 'remove'});

	brush.postprocess = function (options, html, container) {
		$('.insert', html).closest('.source').addClass('insert-line');
		$('.remove', html).closest('.source').addClass('remove-line');
		$('.offset', html).closest('.source').addClass('offset-line');

		return html;
	};
});
