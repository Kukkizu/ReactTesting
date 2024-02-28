
function List(){

    const boxStyles = {
        margin: "20px",
        padding: "5px",
        border: "1px solid black",
        maxWidth: "500px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        borderRadius: "20px",
    }
    const liStyles = {
        padding:"10px",
    }

    const games =  [{id: 1, name: "Valorant", genre: "FPS", rating: 90},
                    {id: 2,name: "Overwatch", genre: "FPS", rating: 70},
                    {id: 3,name: "Super Smash Bros", genre: "FTG", rating: 85},
                    {id: 4,name: "Minecraft", genre: "Sandbox", rating: 100},
                    {id: 5,name: "Pokemon Sword", genre: "RPG", rating: 50},
                    {id: 6,name: "Pokemon Violet", genre: "RPG", rating: 75},
                   ];

    //for every item in games, create a list item of game
    const listItems = games.map(game => <li style = {liStyles}  key = {game.id}>
                                            <b>{game.name}</b>: &nbsp; {game.genre}
                                        </li>);

    const goodGames = games.filter(game => game.rating > 80);

    const goodListItems = goodGames.map(game => <li style = {liStyles} key = {game.id}>
                                                <b>{game.name}</b>: &nbsp; User-Rating: {game.rating}
                                            </li>);

    return(
        <>
            <div style = {boxStyles}>
                <h5>All Games:</h5>
                <ul>{listItems}</ul>
            </div>
            <div style = {boxStyles}>
                <h5>Highly-Rated Games (80+)</h5>
                <ul>{goodListItems}</ul>
            </div>
        </>
    );


}

export default List