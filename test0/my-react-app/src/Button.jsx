
function Button(){

    const handleClick = () => console.log("Button Clicked!");

    const handleClickParam = (name) => console.log(`${name} clicked the button :P`); 

    return(<button onClick = {() => handleClickParam("Justin")}>Click me pls :)</button>);

}

export default Button