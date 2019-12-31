import React from 'react';
import './style.css';

interface ICodeDisplay {
	code: any;
}

export default ({ code }: ICodeDisplay) => (
	<pre className="form--code-block">
		<code>{JSON.stringify(code, null, 2)}</code>
	</pre>
);
