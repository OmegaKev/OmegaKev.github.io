import {useState, useEffect, useCallback, useRef} from 'react';
import './projects.css';
import toyDefault from '../assets/images/GitHub-logo.png';

const RepoElement = ({repo}) => {
    const [toyPhotoLoading, setToyPhotoLoading] = useState({loading: false, image: toyDefault});
    const [repoBody, setRepoBody] = useState({open: true, size: 'auto'});
    const animation_interval = useRef();
    const max_height = useRef();
    
    // Hold a reference to the state of the element
    const state = useRef();
    state.current = repoBody;

    const setSize = useCallback((value) => {
        // Keep new value within 0 - 100 range
        let new_value = Math.max(0, Math.min(state.current.size + value, max_height.current));

        setRepoBody(repoBody => ({open: repoBody.open, size: new_value}));
    }, [max_height]);

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
        if(repoBody.size + speed  <= 0 || repoBody.size + speed >= max_height.current)
            clearInterval(animation_interval.current);
        

    }, [setSize, max_height]);

    // Set variables on load
    useEffect(() => {
        // Set max height of list
        max_height.current = document.getElementById(repo.id).clientHeight;
        setRepoBody(repoBody => ({open: repoBody.open, size: max_height.current}));
        console.log(max_height.current);
    }, []);

    // Load toy image from github repo
    useEffect(()=> {
        // Set the image for the github listing
        const get_toy_url = repo.url + "/contents/ToyPreview.png";

        setToyPhotoLoading({loading: true});
        fetch(get_toy_url)
        .then(res => res.json())
        .then((data) => setToyPhotoLoading({loading: false, json: data}));

        console.log("Loading Image from Github");
        
    }, [setToyPhotoLoading]);

    // Animate closing/opening project boxes
    useEffect(() => {
        if(!isNaN(repoBody.size))
            animation_interval.current = setInterval(alterRepoBody, 10);
        return () => {
            if(animation_interval.current)clearInterval(animation_interval.current);
        }
    }, [repoBody.open]);

    // Grab the toy image for the component
    const getToyImage = () => {
        if(toyPhotoLoading.json && toyPhotoLoading.json.download_url)
        {
            console.log('Loaded Toy Image:', toyPhotoLoading);
            return toyPhotoLoading.json.download_url;
        }
        
        console.log('No toy image found. Loaded Default Image');
        return toyDefault;
    }

    return (
        <li key ={repo.id} className="list">
            <div className="repo-name" onClick={toggleRepoBody}>
                <span>{repo.name}</span>
            </div>
            <div className="repo-body" id={repo.id} style={{height: repoBody.size}}>
                <div className = "repo-body-l-child">
                    <img src = {getToyImage()} alt="Github" />
                </div>
                <div className = "repo-body-r-child">
                    <div className = "repo-body-r-item-header">
                        <span><a href = {repo.html_url} target="_blank" rel="noreferrer">{repo.html_url}</a></span>
                        <span>Run</span>
                    </div>
                    <span>{repo.description}</span>
                </div>
            </div>
        </li>
    );
}

// Repo List Component
// Generate the github list of public projects
const RepoList = ({repos}) => {
// Check and make sure we have a valid repo list
    if(!repos || repos.length === 0 || repos.message) return (<p> Encounted an Github API server error.</p>);

    return (
        <ul>
            <h2 className="list-head">Public Github Repository</h2>
            {repos.map((repo) => {
                return(<RepoElement repo = {repo} key={repo.id} />);
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