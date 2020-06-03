import React from 'react'
import { Card, CardContent, Grid, Typography, Collapse, CardActions, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton, makeStyles, Menu, MenuItem } from '@material-ui/core'
import Moment from 'react-moment';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import NewVinyl from './NewVinyl';


const styles = makeStyles(theme => ({
    root: {
        position: 'relative'
    },
    moreIcon: {
        position: 'absolute',
        right: 2,
        top: 2
    }
}))

function ArtistCard(props) {
    const classes = styles()
    const { id, name, created, updated, openDelete } = props
    const [show, setShow] = React.useState(false)
    const [openMenu, setOpenMenu] = React.useState(null)
    const [openNewVinyl, setOpenNewVinyl] = React.useState(false)
    const [vinyls, setVinyls] = React.useState(props.vinyls)
    const toggleShow = () => {
        setShow(!show)
    }

    const handleOpenNewVinyl = () => {
        setOpenNewVinyl(true)
    }

    const handleCloseNewVinyl = () => {
        setOpenNewVinyl(false)
    }
    const handleOpenMenu = event => {
        setOpenMenu(event.currentTarget)
    }
    const handleCloseMenu = () => {
        setOpenMenu(null)
    }
    const addNewVinyl = (newData) => {
        handleCloseNewVinyl()
        handleCloseMenu()
        console.log('add new', newData)
        const newVinyls = [...newData, ...vinyls]
        setVinyls(newVinyls)

    }

    //  console.log('vinyls', vinyls)
    return (
        <Grid item xs={12} md={4} >
            <Card elevation={7} className={classes.root}>

                <Grid container spacing={1}>
                    <Grid item xs={'auto'}>
                        <Typography variant="body2" color="textSecondary">
                            Lisätty: <Moment format="DD.MM.YYYY - hh:mm">
                                {created}
                            </Moment>
                        </Typography>
                    </Grid>
                    <Grid item xs={'auto'}>
                        <Typography variant="body2" color="textSecondary">
                            Päivitetty:<Moment format="DD.MM.YYYY - hh:mm">
                                {updated}
                            </Moment>
                        </Typography>
                    </Grid>

                </Grid>

                <IconButton
                    className={classes.moreIcon}
                    onClick={handleOpenMenu}
                >
                    <MoreVertIcon />
                </IconButton>

                <CardContent style={{ width: '100%', overflowX: 'hidden' }}>
                    <Grid
                        container
                        alignItems="center"
                    >
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
                        fullWidth
                    >
                        Levyt
                        {!show ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                    </Button>
                </CardActions>
            </Card>

            <Menu22 openMenu={openMenu} handleClose={handleCloseMenu} openDelete={() => openDelete(id, name)} openNewVinyl={handleOpenNewVinyl} />
            {openNewVinyl && <NewVinyl open={openNewVinyl} handleClose={handleCloseNewVinyl} artist={id} name={name} addNew={addNewVinyl} />}

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
                            <TableCell>{row.category && row.category.name}</TableCell>
                            <TableCell>
                                {row.year}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

function Menu22(props) {
    return (
        <div>
            <Menu
                id="simple-menu"
                anchorEl={props.openMenu}
                keepMounted
                open={Boolean(props.openMenu)}
                onClose={props.handleClose}
            >
                <MenuItem onClick={props.openNewVinyl}>
                    Lisää levy
                </MenuItem>
                <MenuItem onClick={() => {
                    props.openDelete()
                    props.handleClose()
                }}>
                    <DeleteIcon /> Poista
                </MenuItem>
            </Menu>
        </div>
    )
}