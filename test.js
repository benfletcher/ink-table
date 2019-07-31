import test from 'ava';
import React from 'react';
import { render as inkRender, Box, Color } from 'ink';
import { render } from 'ink-testing-library';
import PropTypes from 'prop-types';

import Table, { Header, Skeleton, Cell } from '.';

// Helpers -------------------------------------------------------------------

const s = v => <Skeleton>{v}</Skeleton>;
const e = v => <Header>{v}</Header>;
const c = v => <Cell>{v}</Cell>;

const Custom = ({ children }) => <Color red italic>{children}</Color>;
Custom.propTypes = {
  children: PropTypes.any.isRequired,
};

const u = v => <Custom>{v}</Custom>;

// Tests ---------------------------------------------------------------------

test('Renders table.', (t) => {
  const data = [{ name: 'Foo' }];
  const { lastFrame: actual } = render(<Table data={data} />);
  const { lastFrame: expected } = render(
    <span>
      <Box>
        {s('┌')}
        {s('──────')}
        {s('┐')}
      </Box>
      <Box>
        {s('│')}
        {e(' name ')}
        {s('│')}
      </Box>
      <Box>
        {s('├')}
        {s('──────')}
        {s('┤')}
      </Box>
      <Box>
        {s('│')}
        {c(' Foo  ')}
        {s('│')}
      </Box>
      <Box>
        {s('└')}
        {s('──────')}
        {s('┘')}
      </Box>
    </span>,
  );

  t.is(actual(), expected());
});

test('Renders table with numbers.', (t) => {
  const data = [{ name: 'Foo', age: 12 }];
  const { lastFrame: actual } = render(<Table data={data} />);

  const { lastFrame: expected } = render(
    <span>
      <Box>
        {s('┌')}
        {s('──────')}
        {s('┬')}
        {s('─────')}
        {s('┐')}
      </Box>
      <Box>
        {s('│')}
        {e(' name ')}
        {s('│')}
        {e(' age ')}
        {s('│')}
      </Box>
      <Box>
        {s('├')}
        {s('──────')}
        {s('┼')}
        {s('─────')}
        {s('┤')}
      </Box>
      <Box>
        {s('│')}
        {c(' Foo  ')}
        {s('│')}
        {c(' 12  ')}
        {s('│')}
      </Box>
      <Box>
        {s('└')}
        {s('──────')}
        {s('┴')}
        {s('─────')}
        {s('┘')}
      </Box>
    </span>,
  );

  t.is(actual(), expected());
});

test('Renders table with multiple rows.', (t) => {
  const data = [{ name: 'Foo', age: 12 }, { name: 'Bar', age: 15 }];
  const { lastFrame: actual } = render(<Table data={data} />);

  const { lastFrame: expected } = render(
    <span>
      <Box>
        {s('┌')}
        {s('──────')}
        {s('┬')}
        {s('─────')}
        {s('┐')}
      </Box>
      <Box>
        {s('│')}
        {e(' name ')}
        {s('│')}
        {e(' age ')}
        {s('│')}
      </Box>
      <Box>
        {s('├')}
        {s('──────')}
        {s('┼')}
        {s('─────')}
        {s('┤')}
      </Box>
      <Box>
        {s('│')}
        {c(' Foo  ')}
        {s('│')}
        {c(' 12  ')}
        {s('│')}
      </Box>
      <Box>
        {s('├')}
        {s('──────')}
        {s('┼')}
        {s('─────')}
        {s('┤')}
      </Box>
      <Box>
        {s('│')}
        {c(' Bar  ')}
        {s('│')}
        {c(' 15  ')}
        {s('│')}
      </Box>
      <Box>
        {s('└')}
        {s('──────')}
        {s('┴')}
        {s('─────')}
        {s('┘')}
      </Box>
    </span>,
  );

  t.is(actual(), expected());
});

test('Renders table with undefined value.', (t) => {
  const data = [{ name: 'Foo' }, { name: 'Bar', age: 15 }];
  const { lastFrame: actual } = render(<Table data={data} />);

  const { lastFrame: expected } = render(
    <span>
      <Box>
        {s('┌')}
        {s('──────')}
        {s('┬')}
        {s('─────')}
        {s('┐')}
      </Box>
      <Box>
        {s('│')}
        {e(' name ')}
        {s('│')}
        {e(' age ')}
        {s('│')}
      </Box>
      <Box>
        {s('├')}
        {s('──────')}
        {s('┼')}
        {s('─────')}
        {s('┤')}
      </Box>
      <Box>
        {s('│')}
        {c(' Foo  ')}
        {s('│')}
        {c('     ')}
        {s('│')}
      </Box>
      <Box>
        {s('├')}
        {s('──────')}
        {s('┼')}
        {s('─────')}
        {s('┤')}
      </Box>
      <Box>
        {s('│')}
        {c(' Bar  ')}
        {s('│')}
        {c(' 15  ')}
        {s('│')}
      </Box>
      <Box>
        {s('└')}
        {s('──────')}
        {s('┴')}
        {s('─────')}
        {s('┘')}
      </Box>
    </span>,
  );

  t.is(actual(), expected());
});

test('Renders table with custom padding.', (t) => {
  const data = [{ name: 'Foo', age: 12 }, { name: 'Bar', age: 15 }];
  const { lastFrame: actual } = render(<Table data={data} padding={3} />);

  const { lastFrame: expected } = render(
    <span>
      <Box>
        {s('┌')}
        {s('──────────')}
        {s('┬')}
        {s('─────────')}
        {s('┐')}
      </Box>
      <Box>
        {s('│')}
        {e('   name   ')}
        {s('│')}
        {e('   age   ')}
        {s('│')}
      </Box>
      <Box>
        {s('├')}
        {s('──────────')}
        {s('┼')}
        {s('─────────')}
        {s('┤')}
      </Box>
      <Box>
        {s('│')}
        {c('   Foo    ')}
        {s('│')}
        {c('   12    ')}
        {s('│')}
      </Box>
      <Box>
        {s('├')}
        {s('──────────')}
        {s('┼')}
        {s('─────────')}
        {s('┤')}
      </Box>
      <Box>
        {s('│')}
        {c('   Bar    ')}
        {s('│')}
        {c('   15    ')}
        {s('│')}
      </Box>
      <Box>
        {s('└')}
        {s('──────────')}
        {s('┴')}
        {s('─────────')}
        {s('┘')}
      </Box>
    </span>,
  );

  t.is(actual(), expected());
});

test('Renders table with custom header.', (t) => {
  const data = [{ name: 'Foo', age: 12 }, { name: 'Bar', age: 15 }];
  const { lastFrame: actual } = render(<Table data={data} header={Custom} />);

  const { lastFrame: expected } = render(
    <span>
      <Box>
        {s('┌')}
        {s('──────')}
        {s('┬')}
        {s('─────')}
        {s('┐')}
      </Box>
      <Box>
        {s('│')}
        {u(' name ')}
        {s('│')}
        {u(' age ')}
        {s('│')}
      </Box>
      <Box>
        {s('├')}
        {s('──────')}
        {s('┼')}
        {s('─────')}
        {s('┤')}
      </Box>
      <Box>
        {s('│')}
        {c(' Foo  ')}
        {s('│')}
        {c(' 12  ')}
        {s('│')}
      </Box>
      <Box>
        {s('├')}
        {s('──────')}
        {s('┼')}
        {s('─────')}
        {s('┤')}
      </Box>
      <Box>
        {s('│')}
        {c(' Bar  ')}
        {s('│')}
        {c(' 15  ')}
        {s('│')}
      </Box>
      <Box>
        {s('└')}
        {s('──────')}
        {s('┴')}
        {s('─────')}
        {s('┘')}
      </Box>
    </span>,
  );

  t.is(actual(), expected());
});

test('Renders table with custom cell.', (t) => {
  const data = [{ name: 'Foo', age: 12 }, { name: 'Bar', age: 15 }];
  const { lastFrame: actual } = render(<Table data={data} cell={Custom} />);

  const { lastFrame: expected } = render(
    <span>
      <Box>
        {s('┌')}
        {s('──────')}
        {s('┬')}
        {s('─────')}
        {s('┐')}
      </Box>
      <Box>
        {s('│')}
        {e(' name ')}
        {s('│')}
        {e(' age ')}
        {s('│')}
      </Box>
      <Box>
        {s('├')}
        {s('──────')}
        {s('┼')}
        {s('─────')}
        {s('┤')}
      </Box>
      <Box>
        {s('│')}
        {u(' Foo  ')}
        {s('│')}
        {u(' 12  ')}
        {s('│')}
      </Box>
      <Box>
        {s('├')}
        {s('──────')}
        {s('┼')}
        {s('─────')}
        {s('┤')}
      </Box>
      <Box>
        {s('│')}
        {u(' Bar  ')}
        {s('│')}
        {u(' 15  ')}
        {s('│')}
      </Box>
      <Box>
        {s('└')}
        {s('──────')}
        {s('┴')}
        {s('─────')}
        {s('┘')}
      </Box>
    </span>,
  );

  t.is(actual(), expected());
});

test('Renders table with custom skeleton.', (t) => {
  const data = [{ name: 'Foo', age: 12 }, { name: 'Bar', age: 15 }];
  const { lastFrame: actual } = render(<Table data={data} skeleton={Custom} />);

  const { lastFrame: expected } = render(
    <span>
      <Box>
        {u('┌')}
        {u('──────')}
        {u('┬')}
        {u('─────')}
        {u('┐')}
      </Box>
      <Box>
        {u('│')}
        {e(' name ')}
        {u('│')}
        {e(' age ')}
        {u('│')}
      </Box>
      <Box>
        {u('├')}
        {u('──────')}
        {u('┼')}
        {u('─────')}
        {u('┤')}
      </Box>
      <Box>
        {u('│')}
        {c(' Foo  ')}
        {u('│')}
        {c(' 12  ')}
        {u('│')}
      </Box>
      <Box>
        {u('├')}
        {u('──────')}
        {u('┼')}
        {u('─────')}
        {u('┤')}
      </Box>
      <Box>
        {u('│')}
        {c(' Bar  ')}
        {u('│')}
        {c(' 15  ')}
        {u('│')}
      </Box>
      <Box>
        {u('└')}
        {u('──────')}
        {u('┴')}
        {u('─────')}
        {u('┘')}
      </Box>
    </span>,
  );

  t.is(actual(), expected());
});

// ---------------------------------------------------------------------------

inkRender(
  <>
    <Box margin={1} />
    <Table data={[{ foo: 'hello', bar: 'world' }, { foo: 'goodbye', bar: 'earth' }]} />
  </>,
);
