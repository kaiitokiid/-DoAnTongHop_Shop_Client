import { Routes, Route } from 'react-router-dom';

import './App.css';
// import Header from './components/Header';
import NotFound from './components/NotFound';
import Sites from './features/Sites';

function App() {
	// const [users, setUsers] = useState([]);

	// useEffect(() => {
	// 	async function getUser() {
	// 		const url = 'http://localhost:5000/api/user/user?page=1'
	// 		const response = await fetch(url, {
	// 			headers: {
	// 				token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTlkMDBiNjBkMTk5ZTI2YjkyOGUxYzkiLCJpYXQiOjE2MzgwMDI1MjQsImV4cCI6MTYzODAwNjEyNH0.g8ocDnT32Z3iy0uKwQd1InXs-qIpcIemjD2D5Bh7wUA'
	// 			}
	// 		})

	// 		const responseJSON = await response.json();
	// 		const { data } = responseJSON;
	// 		if (data) {
	// 			setUsers(data)
	// 		}
	// 	}

	// 	getUser();
	// }, [])
	// const isHeader = useSelector(state => state.isHeader);

	// console.log('header:', isHeader);

	return (
		<div className="App ">
			<Routes>
				<Route path="/*" element={<Sites />} />

				<Route path="*" element={<NotFound />} />
			</Routes>
		</div>
	);
}

export default App;
