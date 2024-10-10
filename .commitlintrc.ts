import { RuleConfigSeverity } from '@commitlint/types';
import type { UserConfig } from '@commitlint/types';

// eslint-disable-next-line @typescript-eslint/naming-convention
const Configuration: UserConfig = {

	extends:      ['@commitlint/config-conventional'],
	parserPreset: 'conventional-changelog-atom',
	formatter:    '@commitlint/format',
	rules:        {
		'body-leading-blank':   [RuleConfigSeverity.Error, 'always'],
		'footer-leading-blank': [RuleConfigSeverity.Error, 'always'],
		'header-max-length':    [RuleConfigSeverity.Error, 'always', 72],
		'scope-case':           [RuleConfigSeverity.Error, 'always', 'lower-case'],
		'subject-case':         [RuleConfigSeverity.Error, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
		'subject-empty':        [RuleConfigSeverity.Error, 'never'],
		'subject-full-stop':    [RuleConfigSeverity.Error, 'never', '.'],
		'type-case':            [RuleConfigSeverity.Error, 'always', 'lower-case'],
		'type-empty':           [RuleConfigSeverity.Error, 'never'],
		'type-min-length':      [RuleConfigSeverity.Error, 'always', 1],
		'type-enum':            [
			RuleConfigSeverity.Error,
			'always',
			[
				'build',
				'ci',
				'chore',
				'docs',
				'feat',
				'fix',
				'perf',
				'refactor',
				'style',
				'test'
			]
		],
	},
};

export default Configuration;