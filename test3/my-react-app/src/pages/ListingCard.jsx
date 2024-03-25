import * as React from 'react';
import Card from '@mui/material/Card';
import PropTypes from 'prop-types';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

function ListingCard(props) {

    const { id, name, category, price, status, imagePath } = props;

    console.log(id);

    return (
        <Card sx={{ minWidth: '20%', maxWidth: 350, boxShadow: 6 }}>
            <CardMedia
            sx={{ height: 200 }}
            image={ imagePath }
            title="Sprite"
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {category}
                </Typography>        
                <Typography gutterBottom variant="h4" component="div">
                    {name}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                    ${price}
                </Typography>
                <Typography gutterBottom variant="body1" component="div">
                    {status}
                </Typography>
            </CardContent>
            {/*<CardActions >
                <Button size="small">Inquire</Button>
            </CardActions>*/}
        </Card>
    );
}

ListingCard.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    imagePath: PropTypes.string.isRequired
};

// Define default props
ListingCard.defaultProps = {
    name: 'Default Name',
    category: 'Default Category',
    price: 0,
    status: 'Default Status',
    imagePath: 'default_image_path.jpg'
};

export default ListingCard