import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';
import logoImg from '../../assets/logo.svg';
import './styles.css';

export default function Profile() {
    const [incidents, setIncidents] = useState([]);

    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');

    const history = useHistory();
    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId]);

    async function handleDeleteIncident(id){
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    authorization: ongId,
                }
            })

            setIncidents(incidents.filter(i => i.id !== id));

        } catch (error) {
            alert('Erro ao deletar caso, tente novamente.')
        }
    }

    function handleLogout(){
        localStorage.clear()
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span>Bem vinda, {ongName}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button>
                    <FiPower onClick={handleLogout} size={18} color="#E02041"></FiPower>
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map((incident, index) =>
                    <li key={index}>
                        <strong>Caso:</strong>
                        <p>{incident.title}</p>

                        <strong>Descrição:</strong>
                        <p>{incident.description}</p>

                        <strong>Valor:</strong>
                        <p>{Intl.NumberFormat('pt-BR', {style:'currency', currency:'BRL'}).format(incident.value)}</p>

                        <button onClick={() => handleDeleteIncident(incident.id)}>
                            <FiTrash2 size={20} color={"#a8a8b3"} />
                        </button>
                    </li>
                )}
            </ul>
        </div>
    )
}