import { createRoot } from "react-dom/client";
import Pet from "./Pet";
import SearchParams from "./SearchParams";
import { BrowserRouter,Routes,Route,Link } from "react-router-dom";
import Details from "./Details";
import { QueryClient,QueryClientProvider } from "@tanstack/react-query";

// delete the Pet component
const queryClient= new QueryClient({
  defaultOptions:{
    queries:{
      staleTime:Infinity,
      cacheTime:Infinity
    }
  }
})

const App = () => {
  return (
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>
    <div>
      <header>
        <Link to={"/"}><h1>Adopt Me!</h1></Link>
      </header>
      <Routes>
        <Route path="/details/:id" element={<Details />} />
        <Route path="/" element={<SearchParams />} />
      </Routes>
 
    </div>
    </QueryClientProvider>
    </BrowserRouter>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
