import React, { useState } from "react";

// Components
import SearchSection from "components/Search/SearchSection";
import ImageList from "components/Images/ImageList";

function App() {
  const [search, setSearch] = useState(null);

  return (
    <>
      <SearchSection search={search} setSearch={setSearch} />
      <ImageList search={search} />
    </>
  );
}

export default App;
