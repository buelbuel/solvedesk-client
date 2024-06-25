import { A, useParams } from '@solidjs/router'
import { createSignal, createEffect } from 'solid-js'
import { MetaProvider, Title, Link } from '@solidjs/meta'
import './UsersDetail.scss'

interface User {
  email: string
  firstName: string
  // Add other properties if needed
}

const API_URL = import.meta.env.VITE_SERVER_URL;

const UsersDetail = () => {
  const params = useParams();
  const [user, setUser] = createSignal<User | null>(null); // Signal for a single user
  const [loading, setLoading] = createSignal(false);
  const [error, setError] = createSignal<string | null>(null);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      console.log('Token:', token); // Debug log: Check if token is retrieved correctly

      const response = await fetch(`${API_URL}/users/${params.id}`, {
        headers: {
          Authorization: `${token}`
        }
      });
      console.log('API Response:', response); // Debug log: Check the fetch response object

      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }

      const data = await response.json();
      console.log('API Data:', data); // Debug log: Check the parsed JSON data

      setUser(data.user);
    } catch (error) {
      console.error('Error fetching user:', error);
      setError('Failed to fetch user');
    } finally {
      setLoading(false);
    }
  };

  createEffect(() => {
    console.log('Fetching user with params.id:', params.id); // Debug log: Check params.id value
    fetchUser();
  }, [params.id]); // Run effect whenever params.id changes

  console.log('User state:', user()); // Debug log: Check current user state
  console.log('Loading state:', loading()); // Debug log: Check current loading state
  console.log('Error state:', error()); // Debug log: Check current error state

  return (
    <MetaProvider>
      <Title>SolveDesk</Title>
      <Link rel="canonical" href="http://solvedesk.de/" />
      <section class="user-detail-page">
        {loading() && <p>Loading...</p>}
        {error() && <p>Error: {error()}</p>}
        {user() && (
          <div>
            <h1>{user().email}</h1>
            <p>{user().firstName}</p>
            <A href={`/app/users/edit/${params.id}`}>Edit User</A>
          </div>
        )}
      </section>
    </MetaProvider>
  );
};

export default UsersDetail;
