import { useState } from 'react';
import EmployeeCard from './components/EmployeeCard';
import type { Employee } from './Types/Employee';

const sampleEmployee: Employee = {
  name: {
    first: "Charlie",
    last: "Thompson",
  },
  email: "charlie.thompson@example.com",
  picture: {
    medium: "https://randomuser.me/api/portraits/med/men/40.jpg",
  },
};

function App() {
  const [employee, setEmployee] = useState<Employee>(sampleEmployee);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [employeeCount, setEmployeeCount] = useState<number>(0);

  // Transformation de la fonction en "async"
  const getEmployee = async () => {
    setError(null);
    setIsLoading(true);

    try {
      // 1. On attend que le fetch réponde
      const response = await fetch("https://randomuser.me/api?nat=en");

      if (!response.ok) {
        throw new Error("Erreur lors de la communication avec le serveur.");
      }

      // 2. On attend que la conversion en JSON soit terminée
      const data = await response.json();

      // 3. Mise à jour de l'employé et du compteur en cas de succès
      setEmployee(data.results[0]);
      setEmployeeCount((previousCount) => previousCount + 1);

    } catch (err) {
      // 4. Si une erreur survient n'importe où dans le bloc try, on atterrit ici
      console.error("Erreur :", err);
      setError("Oups ! Impossible de récupérer un nouvel employé. Vérifie ta connexion.");
    } finally {
      // 5. S'exécute dans tous les cas (succès ou échec)
      setIsLoading(false);
    }
  };

  return (
    <div className='App'>
      <EmployeeCard employee={employee} />
      
      <p>Nombre d'employés récupérés : {employeeCount}</p>

      {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}

      <button 
        type="button" 
        onClick={getEmployee} 
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : 'Get employee'}
      </button>
    </div>
  );
}

export default App;