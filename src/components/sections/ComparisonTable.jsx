import CheckRounded from '@mui/icons-material/CheckRounded';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { comparison } from '../../content/whyUs';
import Reveal from '../ui/Reveal';
import SurfaceCard from '../ui/SurfaceCard';
import { visuallyHidden } from '../ui/visuallyHidden';

export default function ComparisonTable({ data = comparison }) {
  const ours = data.columns.length - 1;
  const highlight = { bgcolor: 'accent.soft' };

  return (
    <Reveal>
      <SurfaceCard sx={{ p: 0, overflowX: 'auto' }}>
        <Table aria-label="How we compare" sx={{ minWidth: 680, '& td, & th': { px: 3, py: 2 } }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <Box component="span" sx={visuallyHidden}>
                  Criteria
                </Box>
              </TableCell>
              {data.columns.map((column, index) => (
                <TableCell
                  key={column}
                  sx={[index === ours && { ...highlight, color: 'accent.text', fontWeight: 700 }]}
                >
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.rows.map((row) => (
              <TableRow key={row.label} sx={{ '&:last-of-type > *': { borderBottom: 0 } }}>
                <TableCell component="th" scope="row" sx={{ fontWeight: 600 }}>
                  {row.label}
                </TableCell>
                {row.values.map((value, index) => (
                  <TableCell
                    key={data.columns[index]}
                    sx={[
                      index === ours
                        ? { ...highlight, fontWeight: 600 }
                        : { color: 'text.secondary' },
                    ]}
                  >
                    {index === ours ? (
                      <Box
                        component="span"
                        sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}
                      >
                        <CheckRounded
                          aria-hidden="true"
                          sx={{ fontSize: 18, color: 'accent.text' }}
                        />
                        {value}
                      </Box>
                    ) : (
                      value
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SurfaceCard>
    </Reveal>
  );
}
