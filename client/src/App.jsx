import '@radix-ui/themes/styles.css'; // Import Radix UI theme styles
import { Flex, Theme } from '@radix-ui/themes';
import { ThemeProvider } from './theme/ThemeContext'; // Import ThemeProvider
import Header from "./components/Header/Header.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import {ApolloClient, ApolloProvider, createHttpLink, InMemoryCache} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";
import {Outlet} from "react-router-dom";

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <div>
    <ApolloProvider client={client}>
      <ThemeProvider>
        <Flex direction="column" style={{ minHeight: '100vh' }}>
          <Theme>
            <Navbar />
            <Header />
            <Flex direction="column" style={{ flex: 1 }}>
              <Outlet />
            </Flex>
            <Footer />
          </Theme>
        </Flex>
      </ThemeProvider>
    </ApolloProvider>
    </div>
  );
}

export default App;