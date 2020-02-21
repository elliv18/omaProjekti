import React from 'react'
import { withStyles, Typography } from '@material-ui/core'
import { withApollo } from 'react-apollo';

const Styles = {
    root: {
        backgroundColor: 'red',

    },
    title: {
        textAlign: 'center',
        padding: 5
    },
    content: {
        padding: 20,
        position: 'absolute',
        top: 50, bottom: 8, right: 8, left: 8,
        overflow: 'auto',
        backgroundColor: 'grey',
    }
}
class UserView extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props
        return (
            <div className={classes.root}>
                <div className={classes.title}>
                    <Typography variant="h5" >
                        Myytävät tuotteet
                </Typography>
                </div>

                <div className={classes.content}>
                    <Lirum />
                </div>
            </div>
        )
    }
}

export default withStyles(Styles)(withApollo(UserView))


function Lirum() {
    return (
        <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur blandit augue metus, id lobortis nunc ullamcorper posuere. Nam et sapien in arcu posuere consectetur eu vel erat. Phasellus id nunc id massa ornare sodales sit amet et ante. Maecenas rutrum fringilla pretium. Fusce eget tincidunt felis. Etiam a placerat metus, sit amet hendrerit tortor. Sed efficitur metus vel justo accumsan, in volutpat ipsum vehicula. Donec fringilla sem ut sem convallis, ac mollis odio ornare. Aliquam erat volutpat. Nulla molestie, lorem vel ultricies consequat, est quam venenatis mauris, eu viverra quam leo quis ante.

Phasellus elementum ipsum quis massa tincidunt egestas. In nulla diam, consequat id varius sed, aliquet accumsan turpis. Sed commodo quam auctor egestas malesuada. Vivamus pretium dictum felis. Aliquam erat volutpat. Donec vitae ullamcorper leo. Integer augue turpis, commodo eu mauris nec, ornare aliquam leo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque lobortis, eros nec luctus semper, tortor tortor mattis ipsum, eu commodo dui augue a orci. In hac habitasse platea dictumst.

Vestibulum eget feugiat diam, sed mattis lectus. In nec velit ultricies massa laoreet venenatis eget non massa. Nulla nec urna nisi. Aenean sodales risus in gravida laoreet. Ut tincidunt, nunc eu varius molestie, elit odio porta lacus, sed accumsan felis mauris vitae diam. Nam luctus enim non quam tincidunt tempus. Sed molestie viverra sem a maximus. In tellus lacus, aliquet rutrum accumsan nec, ornare ac leo. Nullam rhoncus erat at leo finibus mattis. Pellentesque ac venenatis tellus. Suspendisse vitae feugiat augue. Nam iaculis lectus tellus, non fringilla eros iaculis eget.

Sed elit neque, lobortis et congue ac, ultrices sit amet odio. Duis lacinia posuere sem. Cras et luctus lacus. Ut metus turpis, elementum a quam ac, tristique porttitor odio. Duis lacinia neque nec placerat tincidunt. Aliquam sit amet sapien magna. Curabitur elit lorem, venenatis id mauris et, venenatis sagittis massa. Vestibulum sollicitudin, nulla sed fermentum pellentesque, nisl ligula rutrum ex, porta faucibus odio purus in ligula. Mauris congue tincidunt leo. Vivamus pulvinar sit amet odio a cursus. In accumsan metus libero, a porta lectus posuere id. Nullam tempor nibh condimentum, sagittis ipsum in, vehicula magna.

Phasellus blandit nulla vitae nibh fringilla, vitae vehicula ante commodo. Nunc id eros nisl. Nulla non elit auctor, laoreet metus a, tempor nibh. Aliquam erat volutpat. Nulla non ipsum vel augue volutpat cursus. Donec tincidunt at lectus sed mattis. Sed mollis erat a ligula bibendum, ac vehicula purus hendrerit. Nulla non vulputate libero.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur blandit augue metus, id lobortis nunc ullamcorper posuere. Nam et sapien in arcu posuere consectetur eu vel erat. Phasellus id nunc id massa ornare sodales sit amet et ante. Maecenas rutrum fringilla pretium. Fusce eget tincidunt felis. Etiam a placerat metus, sit amet hendrerit tortor. Sed efficitur metus vel justo accumsan, in volutpat ipsum vehicula. Donec fringilla sem ut sem convallis, ac mollis odio ornare. Aliquam erat volutpat. Nulla molestie, lorem vel ultricies consequat, est quam venenatis mauris, eu viverra quam leo quis ante.

Phasellus elementum ipsum quis massa tincidunt egestas. In nulla diam, consequat id varius sed, aliquet accumsan turpis. Sed commodo quam auctor egestas malesuada. Vivamus pretium dictum felis. Aliquam erat volutpat. Donec vitae ullamcorper leo. Integer augue turpis, commodo eu mauris nec, ornare aliquam leo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque lobortis, eros nec luctus semper, tortor tortor mattis ipsum, eu commodo dui augue a orci. In hac habitasse platea dictumst.

Vestibulum eget feugiat diam, sed mattis lectus. In nec velit ultricies massa laoreet venenatis eget non massa. Nulla nec urna nisi. Aenean sodales risus in gravida laoreet. Ut tincidunt, nunc eu varius molestie, elit odio porta lacus, sed accumsan felis mauris vitae diam. Nam luctus enim non quam tincidunt tempus. Sed molestie viverra sem a maximus. In tellus lacus, aliquet rutrum accumsan nec, ornare ac leo. Nullam rhoncus erat at leo finibus mattis. Pellentesque ac venenatis tellus. Suspendisse vitae feugiat augue. Nam iaculis lectus tellus, non fringilla eros iaculis eget.

Sed elit neque, lobortis et congue ac, ultrices sit amet odio. Duis lacinia posuere sem. Cras et luctus lacus. Ut metus turpis, elementum a quam ac, tristique porttitor odio. Duis lacinia neque nec placerat tincidunt. Aliquam sit amet sapien magna. Curabitur elit lorem, venenatis id mauris et, venenatis sagittis massa. Vestibulum sollicitudin, nulla sed fermentum pellentesque, nisl ligula rutrum ex, porta faucibus odio purus in ligula. Mauris congue tincidunt leo. Vivamus pulvinar sit amet odio a cursus. In accumsan metus libero, a porta lectus posuere id. Nullam tempor nibh condimentum, sagittis ipsum in, vehicula magna.

Phasellus blandit nulla vitae nibh fringilla, vitae vehicula ante commodo. Nunc id eros nisl. Nulla non elit auctor, laoreet metus a, tempor nibh. Aliquam erat volutpat. Nulla non ipsum vel augue volutpat cursus. Donec tincidunt at lectus sed mattis. Sed mollis erat a ligula bibendum, ac vehicula purus hendrerit. Nulla non vulputate libero.
        </div>
    )
}