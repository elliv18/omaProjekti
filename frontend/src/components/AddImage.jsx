import React from 'react'
import { withApollo } from 'react-apollo'
import { Dialog, DialogTitle, DialogContent, Button, Typography, DialogActions, Slider, Grid } from '@material-ui/core'
import { UPLOAD_IMAGE } from '../graphql/resolvers/mutations'
import { Alert } from '@material-ui/lab'
import Cropper from 'react-easy-crop'
import getCroppedImg from './functions/cropImage'

function AddImage(props) {
    const { open, handleClose, id, client } = props
    const [state, setState] = React.useState({
        imageSrc: null,
        crop: { x: 0, y: 0 },
        zoom: 1,
        aspect: 4 / 3,
        croppedAreaPixels: null,
        croppedImage: null,
        isCropping: false,
        imageName: null,
        imageType: null,
        success: ''
    })

    const removeImage = () => {
        setState(state => ({
            ...state,
            imageSrc: null,
            crop: { x: 0, y: 0 },
            zoom: 1,
            aspect: 4 / 3,
            croppedAreaPixels: null,
            croppedImage: null,
            isCropping: false,
            imageName: null,
            imageType: null
        }))
    }

    // triggers when chose file
    const onFileChange = async e => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0]
            let imageDataUrl = await readFile(file)


            setState(state => ({
                ...state,
                imageSrc: imageDataUrl,
                crop: { x: 0, y: 0 },
                zoom: 1,
                imageName: file.name,
                imageType: file.type
            }))
        }
    }

    // uploads file
    const handleUpload = async () => {
        // first get cropped image to file
        var file = null
        try {
            setState(state => ({
                ...state,
                isCropping: true,
            }))
            const croppedImage = await getCroppedImg(
                state.imageSrc,
                state.croppedAreaPixels
            )
            file = new File([croppedImage], state.imageName, { type: state.imageType, lastModified: Date.now() });

            setState(state => ({
                ...state,
                file: file,
                croppedImage: croppedImage,
                isCropping: false,
            }))
        } catch (e) {
            console.error(e)
            setState(state => ({
                ...state,
                isCropping: false,
            }))
        }

        // UPLOAD
        client.mutate({
            mutation: UPLOAD_IMAGE,
            variables: { file, id }
        })
            .then(res => {
                const url = res.data.uploadImage
                console.log(url)
                const msg = "Kuvan lataus onnistui!"
                setState(state => ({ ...state, success: msg, imageSrc: null, croppedImage: null }))
                props.renderImage(id, url)
            })
            .catch(e => console.log(e))

    }


    const onCropChange = crop => {
        setState(state => ({ ...state, crop: crop }))
    }

    const onCropComplete = (croppedArea, croppedAreaPixels) => {
        // console.log(croppedArea, croppedAreaPixels)
        setState(state => ({
            ...state,
            croppedAreaPixels: croppedAreaPixels,
        }))
    }

    const onZoomChange = zoom => {
        setState(state => ({ ...state, zoom: zoom }))
    }



    const { success } = state

    return (
        <Dialog
            open={open}
            onClose={handleClose}

            fullScreen
        >
            <DialogTitle style={{ backgroundColor: 'lightGrey' }}>
                Lisää kuva
            </DialogTitle>

            <DialogContent>
                {state.imageSrc ? (
                    <React.Fragment>
                        <div style={{
                            width: '100%',
                            height: '400px',
                            position: 'relative'
                        }}>
                            <Cropper
                                image={state.imageSrc}
                                crop={state.crop}
                                zoom={state.zoom}
                                aspect={state.aspect}
                                onCropChange={onCropChange}
                                onCropComplete={onCropComplete}
                                onZoomChange={onZoomChange}
                            />
                        </div>

                        <div style={{
                            margin: 'auto',
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                        }}>
                            <Grid container justify="center" alignItems="baseline"
                                style={{
                                    marginTop: '10px',
                                    width: '100%'
                                }}>

                                <Grid item xs={3} style={{ height: 66 }}>
                                    <Button
                                        color="secondary"
                                        variant="contained"
                                        onClick={removeImage}
                                    >
                                        poista kuva
                                    </Button>
                                </Grid>
                                <Grid item xs={9} style={{ height: 66 }}>
                                    <Grid container spacing={1} justify="center" alignItems="center"
                                        style={{
                                            marginTop: '20px'
                                        }}>
                                        <Grid item xs={4} style={{ height: '42px' }} >
                                            <Typography variant="h6">
                                                Zoomaa kuvaa
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={8} style={{ height: '42px' }}>
                                            <Slider
                                                value={state.zoom}
                                                min={1}
                                                max={3}
                                                step={0.1}
                                                aria-labelledby="Zoom"
                                                onChange={(e, zoom) => onZoomChange(zoom)}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>
                    </React.Fragment>

                )
                    : state.success.length === 0
                        ? <div style={{
                            width: '100%',
                            textAlign: 'center',
                            paddingTop: '5%'
                        }}>
                            <input
                                type="file"
                                onChange={onFileChange}
                                accept="image/*"
                                id="raised-button-file"
                                style={{ display: 'none' }}

                            />
                            <label htmlFor="raised-button-file">
                                <Button variant="contained" component="span" color="primary" >
                                    Valitse kuva
                            </Button>
                            </label>
                        </div>
                        : null
                }

                {state.success.length > 1 &&
                    <Alert
                        severity="success"
                        style={{ marginBottom: '10px', width: '100%' }}
                        action={
                            <Button color="inherit" size="small" onClick={() => {
                                handleClose()
                                removeImage()
                            }
                            }>
                                Sulje
                        </Button>
                        }
                    >
                        <Typography variant="subtitle1">{success}</Typography>
                    </Alert>}

            </DialogContent>


            {state.success.length === 0 &&
                <DialogActions style={{ borderTop: '1px solid grey' }}>

                    <Button
                        color="primary"
                        variant="contained"
                        onClick={handleUpload}
                        disabled={state.isCropping}
                    >
                        Lähetä
                  </Button>
                    <Button color="secondary" variant="contained" onClick={() => {
                        handleClose()
                        removeImage()
                    }}>
                        Sulje
                        </Button>
                </DialogActions>}
        </Dialog>
    )
}

export default withApollo(AddImage)

function readFile(file) {
    return new Promise(resolve => {
        const reader = new FileReader()
        reader.addEventListener('load', () => resolve(reader.result), false)
        reader.readAsDataURL(file)
    })
}
/*
import React from 'react'
import { withApollo, Mutation } from 'react-apollo'
import { Dialog, DialogTitle, DialogContent, Button, Typography, DialogActions } from '@material-ui/core'
import { UPLOAD_IMAGE } from '../graphql/resolvers/mutations'
import { Alert } from '@material-ui/lab'
import Cropper from 'react-easy-crop'
import getCroppedImg from './functions/cropImage'

function AddImage(props) {
    const { open, handleClose, id, client } = props
    const [state, setState] = React.useState({
        file: null,
        previewUrl: null,
        success: ''

    })

    const handleChange = e => {
        let reader = new FileReader();
        let file = e.target.files[0];

        setState(state => ({
            ...state,
            previewUrl: URL.createObjectURL(e.target.files[0]),
            file: file,
        }))

        // setImage(URL.createObjectURL(event.target.files[0]))
        reader.readAsDataURL(file)

    }

    const removeImage = () => {
        setState({
            file: null,
            previewUrl: null,
            success: ''
        })
    }

    const handleUpload = () => {
        const { file } = state

        client.mutate({
            mutation: UPLOAD_IMAGE,
            variables: { file, id }
        })
            .then(res => {
                console.log(res.data.uploadImage)
                const msg = "Kuvan lataus onnistui!"
                setState(state => ({ ...state, previewUrl: null, file: null, success: msg }))
            })
            .catch(e => console.log(e))

    }

    const { file, previewUrl, success } = state

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
                Lisää kuva
            </DialogTitle>

            <DialogContent>
                {success.length > 1 &&
                    <Alert
                        severity="success"
                        style={{ marginBottom: '10px', width: '100%' }}
                        action={
                            <Button color="inherit" size="small" onClick={() => {
                                handleClose()
                                removeImage()
                            }
                            }>
                                Sulje
                        </Button>
                        }
                    >
                        <Typography variant="subtitle1">{success}</Typography>
                    </Alert>}

                {!file && <input type="file" onChange={handleChange} />}
                {file && <img src={previewUrl} />}

            </DialogContent>

            <DialogActions>
                {
                    file ? (
                        <React.Fragment>
                            <Button onClick={removeImage} variant="contained" color="secondary"> Poista kuva </Button>
                            <Button onClick={handleUpload} variant="contained" color="primary"> Lähetä kuva </Button>
                        </React.Fragment>
                    )
                        : <Button color="secondary" variant="contained" onClick={() => {
                            handleClose()
                            removeImage()
                        }}>
                            Sulje
                        </Button>
                }
            </DialogActions>
        </Dialog>
    )
}

export default withApollo(AddImage)

/*
<Mutation mutation={UPLOAD_IMAGE}>
                    {uploadFile =>
                        (<input type="file" required onChange={
                            ({ target: { validity, files: [file] } }) =>
                                validity.valid && uploadFile({ variables: { file, id } }).then(res => console.log(res.data.uploadImage))
                        }
                        />)}
                </Mutation>*/