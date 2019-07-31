import React from 'react';
import { Box, Color } from 'ink';
import PropTypes from 'prop-types';

// Components ----------------------------------------------------------------

const Header = ({ children }) => (
  <Color blue bold>{children}</Color>
);

Header.propTypes = {
  children: PropTypes.any.isRequired,
};

const Cell = ({ children }) => (
  <Color>{children}</Color>
);

Cell.propTypes = {
  children: PropTypes.any.isRequired,
};

const Skeleton = ({ children }) => (
  <Color white bold>{children}</Color>
);

Skeleton.propTypes = {
  children: PropTypes.any.isRequired,
};

// Helpers -------------------------------------------------------------------

const intersperse = val => vals => vals.reduce(
  (s, c, i) => (s.length === 0 ? [c] : [...s, val(i), c]), [],
);

const line = (key, Cell2, Skeleton2, {
  line: line2, left, right, cross, padding,
}) => (cells, index = '') => {
  const fillWithLine = length2 => str => `${str}${line2.repeat(length2 - str.length)}`;

  const columns = cells.map(({ width, key: key2, value }, i) => (
    <Cell2 key={key2 + String(i)}>
      {line2.repeat(padding)}
      {fillWithLine(width - padding)((value || String()).toString())}
    </Cell2>
  ));

  return (
    <Box key={key + String(index)}>
      <Skeleton2>{left}</Skeleton2>
      {intersperse(i => <Skeleton2 key={i}>{cross}</Skeleton2>)(columns)}
      <Skeleton2>{right}</Skeleton2>
    </Box>
  );
};

// Table ---------------------------------------------------------------------

// Config --------------------------------------------------------------------

const Table = ({
  data, padding, header, cell, skeleton,
}) => {
  const topLine = line('top', skeleton, skeleton, {
    line: '─', left: '┌', right: '┐', cross: '┬', padding,
  });

  const bottomLine = line('bottom', skeleton, skeleton, {
    line: '─', left: '└', right: '┘', cross: '┴', padding,
  });

  const midLine = line('mid', skeleton, skeleton, {
    line: '─', left: '├', right: '┤', cross: '┼', padding,
  });

  const headers = line('header', header, skeleton, {
    line: ' ', left: '│', right: '│', cross: '│', padding,
  });

  const row = line('row', cell, skeleton, {
    line: ' ', left: '│', right: '│', cross: '│', padding,
  });

  const union = (...arrs) => [...new Set([].concat(...arrs))];
  const keys = union(...data.map(Object.keys));


  const generateColumn = padding2 => data2 => (key) => {
    const allColumns = data2.map(obj => obj[key]);
    const columnsWithValues = allColumns.filter(v => v !== undefined);
    const vals = columnsWithValues.map(val => (val || String()).toString());
    const lengths = vals.map(el => el.length);
    const width = Math.max(...lengths, key.length) + (padding2 * 2);

    return { width, key };
  };

  const columns = keys.map(generateColumn(padding)(data));

  const headings = keys.reduce((o, k) => ({ ...o, [k]: k }), {});

  const skeletonPvt = keys.reduce((o, k) => ({ ...o, [k]: '' }), {});


  const getCells = columns2 => data2 => columns2.map(
    ({ width, key }) => ({ width, key, value: data2[key] }),
  );

  const getRow = getCells(columns);
  const headersRow = getRow(headings);
  const emptyRow = getRow(skeletonPvt);
  const rows = data.map((d, i) => row(getRow(d), i));

  return (
    <span>
      {topLine(emptyRow)}
      {headers(headersRow)}
      {midLine(emptyRow)}
      {intersperse(i => midLine(emptyRow, i))(rows)}
      {bottomLine(emptyRow)}
    </span>
  );
};

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  padding: PropTypes.number,
  header: PropTypes.func,
  cell: PropTypes.func,
  skeleton: PropTypes.func,
};

Table.defaultProps = {
  data: [],
  padding: 1,
  header: Header,
  cell: Cell,
  skeleton: Skeleton,
};

// Exports -------------------------------------------------------------------

export default Table;
export { Header, Cell, Skeleton };

// ---------------------------------------------------------------------------
