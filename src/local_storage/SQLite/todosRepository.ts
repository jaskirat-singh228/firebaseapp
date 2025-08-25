import SQLite, { SQLError, SQLiteDatabase, Transaction } from 'react-native-sqlite-storage';
import { TTodoData } from 'screens/todos';

SQLite.enablePromise(false);

const tableName = 'todos';

const db: SQLiteDatabase = SQLite.openDatabase(
	{ name: 'todos.db', location: 'default' },
	(db: SQLiteDatabase) => {
		// This callback is called when the database is successfully opened
		console.log('Database opened successfully:', db);
	},
	(err: SQLError) => console.error('SQL Error: ', err),
);

// Initialize DB once
const createTable = () => {
	db.transaction((tx: Transaction) => {
		tx.executeSql(
			`CREATE TABLE IF NOT EXISTS ${tableName} (
        todoId NVARCHAR(255) PRIMARY KEY,
        todo TEXT NOT NULL,
        createdAt TEXT NOT NULL,
        isSynced INTEGER NOT NULL
      );`,
			[],
			() => {
				console.log(`Table ${tableName} initialized successfully.`);
			},
			(_, err: SQLError) => {
				console.error('Error initializing table:', err);
			},
		);
	});
};

createTable(); // Call once when importing

export const addAndReplaceOfflineTodo = (
	todo: TTodoData,
): Promise<{ message: string; data: TTodoData }> => {
	return new Promise((resolve, reject) => {
		db.transaction(
			(tx: Transaction) => {
				tx.executeSql(
					`INSERT OR REPLACE INTO ${tableName} (todoId, todo, createdAt, isSynced) VALUES (?, ?, ?, ?);`,
					[todo.todoId, todo.todo, todo.createdAt, todo.isSynced],
					() => {
						resolve({
							message: 'Todo added successfully!',
							data: todo,
						});
					},
					(_, error: SQLError) => {
						console.error('Todo failed to insert!`', error);
						reject(error);
						return true; // to stop the transaction
					},
				);
			},
			(error: SQLError) => {
				console.error('Transaction error:', error);
				reject(error);
			},
		);
	});
};

export const getLocalTodos = (): Promise<{
	message: string;
	data: TTodoData[];
}> => {
	return new Promise((resolve, reject) => {
		db.transaction((tx: Transaction) => {
			tx.executeSql(
				`SELECT * FROM ${tableName} ORDER BY createdAt ASC;`,
				[],
				(_: any, results: any) => {
					const todos: TTodoData[] = [];
					for (let i = 0; i < results.rows.length; i++) {
						todos.push(results.rows.item(i));
					}
					resolve({
						message: `Todo fetched successfuly! `,
						data: todos,
					});
				},
				(_, err: SQLError) => reject(err),
			);
		});
	});
};

export const getUnsyncedTodos = (): Promise<TTodoData[]> => {
	return new Promise((resolve, reject) => {
		db.transaction((tx: Transaction) => {
			tx.executeSql(
				`SELECT * FROM ${tableName} WHERE isSynced = 0;`,
				[],
				(_: any, results: any) => {
					const todos: TTodoData[] = [];
					for (let i = 0; i < results.rows.length; i++) {
						todos.push(results.rows.item(i));
					}
					resolve(todos);
				},
				(_, err: SQLError) => {
					reject(err);
					return true; // Return true to signal error handled
				},
			);
		});
	});
};

export const updateLocalTodos = (
	newValue: number,
	todoId: string,
): Promise<{ message: string }> => {
	return new Promise((resolve, reject) => {
		db.transaction((tx: Transaction) => {
			tx.executeSql(
				`UPDATE ${tableName} SET isSynced = ? WHERE todoId = ?;`,
				[newValue, todoId],
				() => resolve({ message: `Todo with ID ${todoId} synced successfully` }),
				(_, err: SQLError) => reject(err),
			);
		});
	});
};

export const deleteLocalTodo = (todoId: string): Promise<{ message: string }> => {
	return new Promise((resolve, reject) => {
		db.transaction((tx: Transaction) => {
			tx.executeSql(
				`DELETE FROM ${tableName} WHERE todoId = ?;`,
				[todoId],
				(_: any) => resolve({ message: 'Todo Deleted successfuly!' }),
				(_, err: SQLError) => reject(err),
			);
		});
	});
};

export const editLocalTodo = (todoId: string, todo: Partial<TTodoData>): Promise<any> => {
	return new Promise((resolve, reject) => {
		db.transaction((tx: Transaction) => {
			tx.executeSql(
				`UPDATE ${tableName}
         SET todo = ?
         WHERE todoId = ?;`,
				[todo.todo, todoId],
				(_: any, result: any) => resolve(result),
				(_, err: SQLError) => reject(err),
			);
		});
	});
};

// export const clearAllTodos = (): Promise<void> => {
//   return new Promise((resolve, reject) => {
//     db.transaction((tx: Transaction) => {
//       tx.executeSql(
//         `DELETE FROM ${tableName};`,
//         [],
//         () => resolve(),
//         (_, err: SQLError) => reject(err),
//       );
//     });
//   });
// };
