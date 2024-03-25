import React, { useState, useEffect } from 'react';
import ListingCard from "./ListingCard";
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container'


function Listings() {
    const [allListings, setAllListings] = useState([]);

    useEffect(() => {

        fetch(`http://localhost/kumaprints/listings.php`)
        .then(function(response){

            return response.json();

        }).then(function(data){

            console.log(data);
            setAllListings(data);
            
        });
    }, []); // Empty dependency array means this effect runs once after the initial render

    const listingCards = allListings.map(item => (
        <ListingCard 
            key={parseInt(item.id)}
            id={parseInt(item.id)}
            name={item.name}
            category={item.category}
            price={parseFloat(item.price)}
            status={item.status}
            imagePath={`http://localhost/kumaprints/${item.image_path}`}
        />
    ));

    return(
        <div>
            <Container sx={{ m:5 }}>
                <Stack direction="row" spacing={2}>
                    {listingCards}
                </Stack>  
            </Container>
        </div>
    );
}

export default Listings;
