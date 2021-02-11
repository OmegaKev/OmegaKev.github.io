const skills = ['C++', 'C#', 'Java', 'JavaScript', 'Python', 'SQL', 'XHTML/HTML5', 'CSS'];
const platforms = ['Windows', 'Linux', 'Android'];
const tools = ['Git', 'GitHub', 'Bitbucket', 'Bash', 'Shell', 'Visual Studio', 'Visual Studio Code', 'IntelliJ IDEA'];

const BulletList = ({list}) =>
{
    let bl_list = [];
    list.forEach((item, index) => bl_list.push(<li key={index}>{item}</li>));

    return(
        <>
            <ul>{bl_list}</ul>
        </>
    );
}

// Create a bullet list and display it
const ShowBulletList = ({d_list, header}) => {
    return (
        <>
            {header}
            <BulletList list = {d_list} />
        </>
    );
}

// Display the skill list
const ShowSkills = ({header}) => {
    return(
        <ShowBulletList d_list = {skills} header = {header} />
    );
}

// Display the platform list
const ShowPlatforms = ({header}) => {
    return(
        <ShowBulletList d_list = {platforms} header = {header} />
    );
}

// Display the tool list
const ShowTools = ({header}) => {
    return(
        <ShowBulletList d_list = {tools} header = {header} />
    );
}

const Page_About = () =>
{
    return (
        <div>
            <div className="text-border">
                <span>
                    <h1>Summary</h1>
                    <p>My name is Kevin Hall, and I have an excellent academic record at the master’s level, ability to debug software, fluent in a variety of programming languages such as C++, Java, C#, Python, JavaScript, and front-end web design experience using HTML5, and CSS.</p>
                    <p>I have a strong understanding of functional designs and structures and am experienced in supporting a team in an agile work environment as a Software Engineer utilizing version control systems such as Git, and Bitbucket.</p>
                    <p>My goal is to continually expand my knowledge and skillset with new technologies to advance my role in an innovative and ambitious organization.</p>
                    <h1>Interests and Hobbies</h1>
                    <p>In my free time, I enjoy keeping up with the occasional sci-fi show like “The Expanse”, or “Star Trek”. I spend time learning new languages and frameworks to explore new ideas and improve the developmental process of the work I am currently doing. Since COVID-19, I have taken up the occasional walk and weightlifting to improve my physical health and well-being.</p>
                    <ShowSkills header = {<h1>Current Skills</h1>} />
                    <ShowPlatforms header = {<h1>Platforms</h1>} />
                    <ShowTools header = {<h1>Tools</h1>} />
                </span>
            </div>
        </div>
      );
}

export default Page_About;