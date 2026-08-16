import stylistic from '@stylistic/eslint-plugin';

export default [
	{
		plugins: {
			'@stylistic': stylistic
		},
		rules: {
			'@stylistic/array-bracket-spacing': ['error', 'never'],
			'@stylistic/arrow-parens': ['error', 'as-needed'],
			'@stylistic/arrow-spacing': 'error',
			'@stylistic/block-spacing': ['error', 'always'],
			'@stylistic/brace-style': [
				'error',
				'1tbs',
				{allowSingleLine: true}
			],
			'@stylistic/comma-dangle': ['error', 'never'],
			'@stylistic/comma-spacing': 'error',
			'@stylistic/computed-property-spacing': ['error', 'never'],
			'@stylistic/eol-last': ['error', 'always'],
			'@stylistic/function-call-spacing': ['error', 'never'],
			'@stylistic/indent': ['error', 'tab', {SwitchCase: 1}],
			'@stylistic/key-spacing': 'error',
			'@stylistic/keyword-spacing': 'error',
			'@stylistic/no-mixed-spaces-and-tabs': 'error',
			'@stylistic/no-trailing-spaces': 'error',
			'@stylistic/object-curly-spacing': ['error', 'never'],
			'@stylistic/quotes': ['error', 'single', {avoidEscape: true}],
			'@stylistic/rest-spread-spacing': ['error', 'never'],
			'@stylistic/semi': ['error', 'always'],
			'@stylistic/semi-spacing': 'error',
			'@stylistic/space-before-blocks': 'error',
			'@stylistic/space-before-function-paren': [
				'error',
				{anonymous: 'always', asyncArrow: 'always', named: 'never'}
			],
			'@stylistic/space-in-parens': ['error', 'never'],
			'@stylistic/space-infix-ops': 'error',
			'@stylistic/space-unary-ops': 'error',
			'@stylistic/template-curly-spacing': ['error', 'never']
		}
	}
];
