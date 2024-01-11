async function taketime() {
    await new Promise ((resolve) => {
        setTimeout(resolve, 3000);
    });

}



export default async function About() {
    await taketime();
    return  (
        <div>
            <h1>This is about page</h1>
        </div>
    )
}