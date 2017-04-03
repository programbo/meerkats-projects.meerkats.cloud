import { auth } from '~/lib/firebase';

const handleLogout = async () => {
  await auth().signOut();
  console.log('Signed out');
};

export default () => (
  <div className="logout-container">
    <button className="logout-button" onClick={handleLogout}>Logout</button>
  </div>
);
