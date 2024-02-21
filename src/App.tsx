import React, { useState, useEffect } from 'react'
import './App.css'

interface Task {
	description: string
	price: number
}

const App: React.FC = () => {
	const [description, setDescription] = useState<string>('')
	const [price, setPrice] = useState<number | ''>('')
	const [tasksList, setTasksList] = useState<Task[]>([])

	useEffect(() => {
		// Show tasks list when the component mounts
		showTasksList()
	}, [])

	const refreshPage = () => {
		window.location.reload()
	}

	const eraseTask = (index: number) => {
		if (!isNaN(index) && index >= 0 && index < tasksList.length) {
			const updatedTasksList = [...tasksList]
			updatedTasksList.splice(index, 1)
			setTasksList(updatedTasksList)
			localStorage.setItem(
				'listaTareas',
				JSON.stringify(updatedTasksList)
			)
		} else {
			alert('Índice inválido')
		}
	}

	const addTask = () => {
		if (!description.trim()) {
			alert('Por favor, ingresa una descripción para la tarea.')
			return
		}

		if (isNaN(parseFloat(price as unknown as string)) || price === '') {
			alert('Por favor, ingresa un precio válido para la tarea.')
			return
		}

		const task: Task = {
			description,
			price: parseFloat(price as unknown as string),
		}

		const updatedTasksList = [...tasksList, task]
		setTasksList(updatedTasksList)
		localStorage.setItem('listaTareas', JSON.stringify(updatedTasksList))
		showTasksList()

		// Clear the input fields
		//setDescription('')
		//setPrice('')
	}

	const showTasksList = () => {
		const storedTasksList = JSON.parse(
			localStorage.getItem('listaTareas') || '[]'
		)
		setTasksList(storedTasksList)
	}

	const calculateTotal = () => {
		const total = tasksList.reduce((sum, task) => sum + task.price, 0)
		alert('Total: €' + total.toFixed(2))
	}

	const eraseAll = () => {
		localStorage.removeItem('listaTareas')
		setTasksList([])
	}

	return (
		<div>
			{/* Navbar */}
			<div className="navbar">
				<a href="#" onClick={refreshPage} className="title-navbar">
					Tasks Manager
				</a>
				<a href="#" onClick={calculateTotal}>
					Calcular Total
				</a>
				<a href="#" onClick={eraseAll}>
					Borrar Todo
				</a>
			</div>

			{/* Add task */}
			<div id="formulario">
				<h2>Añadir Tarea</h2>
				<div>
					<label htmlFor="descripcion">Descripción:</label>
					<input
						type="text"
						id="descripcion"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</div>

				<div>
					<label htmlFor="precio">Precio:</label>
					<input
						type="number"
						id="precio"
						value={price}
						onChange={(e) =>
							setPrice(e.target.value as number | '')
						}
					/>
				</div>

				<button onClick={addTask}>Añadir Tarea</button>
			</div>

			{/* Tasks list */}
			<div id="lista">
				<h2>Lista de Tareas</h2>
				<ul>
					{tasksList.map((task, index) => (
						<li key={index}>
							<span>
								{task.description} -{' '}
								{task.price !== null
									? `€${task.price.toFixed(2)}`
									: 'Price not available'}
							</span>
							<span
								style={{ cursor: 'pointer' }}
								onClick={() => eraseTask(index)}
							>
								🗑️
							</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}

export default App
