import { useState, memo } from "react"
import { faker } from "@faker-js/faker";
import { useMemo } from "react";

function createRandomPost() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}

const App = () => {
  const [search, setSearch]   = useState("");

  // const archiveOptions  = {
  //   show: false,
  //   title: "Post Archieve In Addition to Main Posts"
  // }

  const archiveOptions = useMemo(() => {
    return {
      show: false,
      title: "Post Archieve In Addition to Main Posts"
    }
  }, [])

  return (
    <div>
      <h3>useMemo</h3>
      Search:{` `}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <br /><br />
      <Archive archiveOptions={archiveOptions} />
    </div>
  )
}

const Archive = memo(function Archive({ archiveOptions }) {
  const [posts]   = useState(() => 
    Array.from({ length: 20000 }, () => createRandomPost())
  );

  const [showArchive, setShowArchive] = useState(archiveOptions.show);

  console.log(showArchive);
  console.log(posts.length);

  return (
    <>
      <h2>Archive: {archiveOptions.title}</h2>
      <button onClick={() => setShowArchive(prev => !prev)}>Show Archieve List</button>
      {showArchive && (
        <ul>
          {posts.map((post, index) => (
            <li key={index}>
              <p>{post.title}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
})

export default App