```mermaid

sequenceDiagram
    participant browser
    participant server

    Note right of browser: The page notes is already render in browser

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    server-->>browser: Status Code: 302
    deactivate server

    Note left of server: Server redirect URL to https://studies.cs.helsinki.fi/exampleapp/notes

    Note right of browser: Browser reloads the page
 
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: Status Code: 200 and HTML Document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: Status Code: 200 and CSS file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: Status Code: 200 and Javascript file
    deactivate server

    Note right of browser: Browser executes Javascript file

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: JSON file: [{content: "", date: "2024-05-04"}, ...]
    deactivate server

    Note right of browser: Browser renders the notes from data.json
