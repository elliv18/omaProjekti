import React from 'react'
import { Card, CardContent, Grid, Typography, Collapse, CardActions, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Tooltip } from '@material-ui/core'
import Moment from 'react-moment';
import DeleteIcon from '@material-ui/icons/Delete';

function ArtistCard(props) {
    const { id, name, created, updated, vinyls, openDelete } = props
    const [show, setShow] = React.useState(false)

    const toggleShow = () => {
        setShow(!show)
    }
    //  console.log('vinyls', vinyls)
    return (
        <Grid item xs={12} md={4} >
            <Card elevation={7} >
                <Typography variant="body2" color="textSecondary">
                    Lisätty: <Moment format="DD.MM.YYYY - hh:mm    ">
                        {created}
                    </Moment>

                     Päivitetty: <Moment format="DD.MM.YYYY - hh:mm">
                        {updated}
                    </Moment>
                </Typography>

                <CardContent style={{ width: '100%', overflowX: 'hidden' }}>
                    <Grid
                        container
                        alignItems="center"
                    >
                        <Grid item xs={2}>
                            <Tooltip title="Poista">
                                <IconButton
                                    onClick={() => openDelete(id, name)}
                                >
                                    <DeleteIcon style={{ color: 'red' }} />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        <Grid item xs={10}>
                            <h2>{name}</h2>
                        </Grid>
                    </Grid>
                    <Collapse in={show}>
                        <h3>Levyt</h3>
                        <VinylsTable
                            vinyls={vinyls}
                        />
                    </Collapse>
                </CardContent>
                <CardActions>
                    <Button
                        variant="outlined"
                        onClick={toggleShow}
                    >
                        {!show ? "Näytä levyt" : "Piilota levyt"}
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default ArtistCard

function VinylsTable(props) {
    const { vinyls } = props
    return (
        <TableContainer>
            <Table>
                <TableHead style={{ backgroundColor: 'lightGrey' }}>
                    <TableRow>
                        <TableCell>Nimi</TableCell>
                        <TableCell>Tyyppi</TableCell>
                        <TableCell>Kunto</TableCell>
                        <TableCell>Kategoria</TableCell>
                        <TableCell>Vuosi</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {vinyls.map((row, i) => (
                        <TableRow key={i}>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.type}</TableCell>
                            <TableCell>{row.condition}</TableCell>
                            <TableCell>{row.category.name}</TableCell>
                            <TableCell>
                                <Moment format="YYYY/MM">
                                    {row.year}
                                </Moment>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}