import { Button, Typography, Grid, Paper, Box } from "@mui/material";
import { styled } from '@mui/material/styles'
import { test } from '../paper/draw1'

export default function MUI() {
    return (
        <div>
            <Typography align="center" variant="h2" color="inherit">
                This is a button :)
            </Typography>
            <Button>Click Me!</Button>
        </div>
    );
};

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export function TestControls() {
    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container direction="row" justifyContent="space-between" alignItems="flex-start" columns={4} container spacing={2}>
                    <Grid item xs={1} sm={1}>
                        <Item>
                            <Button variant="contained" onClick={test}>Add LED</Button>
                        </Item>
                    </Grid>
                    <Grid item xs={1} sm={1}>
                        <Item>
                            <Button variant="contained">Move Points</Button>
                        </Item>
                    </Grid>
                    <Grid item xs={1} sm={1}>
                        <Item>
                            <Button variant="contained">Draw Lines</Button>
                        </Item>
                    </Grid>
                    <Grid item xs={1} sm={1}>
                        <Item>
                            <Button variant="contained">XXXtra</Button>
                        </Item>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}
