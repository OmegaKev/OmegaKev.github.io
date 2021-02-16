import {useState, useEffect, useCallback, useRef} from 'react';
import './projects.css';

const RepoElement = ({repo}) => {
    const [repoBody, setRepoBody] = useState({open: true, size: 100});
    const animation_interval = useRef();
    
    // Hold a reference to the state of the element
    const state = useRef();
    state.current = repoBody;

    const setSize = useCallback((value) => {
        // Keep new value within 0 - 100 range
        let new_value = Math.max(0, Math.min(state.current.size + value, 100));

        setRepoBody(repoBody => ({open: repoBody.open, size: new_value}));
    }, []);

    const setOpenState = useCallback((state) => {
        setRepoBody(repoBody => ({open: state, size: repoBody.size}));
    }, []);

    const toggleRepoBody = () => {
        setOpenState(!repoBody.open);
    }

    const alterRepoBody = useCallback(() =>
    {
        console.log('Update Size');
        let speed = 5;
        let repoBody = state.current;
    
        // Adjust speed to be postive/negative depending on whether we are opening or closing
        if(!repoBody.open)speed = -speed;
        setSize(speed);

        // Animation is done if it reaches 0 or 100
        if(repoBody.size + speed  <= 0 || repoBody.size + speed >= 100)
            clearInterval(animation_interval.current);
        

    }, [setSize]);


    useEffect(() => {
        // Animate closing/opening project boxes
        if(animation_interval.current)clearInterval(animation_interval.current);
        animation_interval.current = setInterval(alterRepoBody, 10);
    }, [repoBody.open]);

    return (
        <>
            <div className="repo-name" onClick={toggleRepoBody} >
                <span>{repo.name}</span>
            </div>

            <div className="repo-body" style={{'height': repoBody.size}}>
                <div className = "repo-body-l-child">
                    <span>Image</span>
                </div>
                <div className = "repo-body-r-child">
                    <div><span><a href = {repo.html_url} target="_blank">{repo.html_url}</a></span><span>Run</span></div>
                    <span>{repo.description}</span>
                </div>
            </div>
        </>
    );
}

// Repo List Component
// Generate the github list of public projects
const RepoList = ({repos}) => {
    
    if(!repos || repos.length === 0) return (<p>No Repos were loaded...</p>);
    return (
        <ul>
            <h2 className="list-head">Public Github Repository</h2>
            {repos.map((repo) => {
                return(
                    <li key ={repo.id} className="list">
                        <RepoElement repo = {repo}/>
                    </li>
                );
            })}
        </ul>
    );
}

// Return Component after it is loaded
const LoadRepo = (Component) => {
    return ({isLoading, ...props}) => {
        if(!isLoading) return <Component {...props} />
        return (
            <p>Fetching Repository Data...</p>
        );
    }
}

const Page_Projects = () => {
    const RepoLoading = LoadRepo(RepoList);
    const [appState, setAppState] = useState({
        loading: false,
        repos: null
    });

    useEffect(() => {
        console.log("Loading Github Repo using API");
        setAppState({loading: true});
        const apiUrl = 'https://api.github.com/users/OmegaKev/repos';
        fetch(apiUrl)
        .then((res) => res.json())
        .then((repos) => {setAppState({loading: false, repos: repos})});
    }, [setAppState]);

    return (
        <>
            <div className="repo-container">
                <RepoLoading isLoading={appState.loading} repos={appState.repos} />
            </div>
        </>
    );
}

export default Page_Projects;