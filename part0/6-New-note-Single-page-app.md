```mermaid

sequenceDiagram
  participant browser
  participant server

  Note right of browser: The page spa is already render in browser
  
  browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa 
  activate server
  Note right of browser: content-type: application/json
  server-->>browser: Status Code: 201 and {"message":"note created"} 
  deactivate server

  Note right of browser: browser renders the notes with the new content