import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';
import './styles.css';

export default function NewIncident() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const ongId = localStorage.getItem('ongId');

    async function handleSubmit(e) {
        e.preventDefault();

        const data = { title, description, value };

        try {
            await api.post('/incidents', data, {
                headers: {
                    Authorization: ongId,
                }
            });
            alert('Cadastro realizado com sucesso');
            setValue('');
            setTitle('');
            setDescription('');
        } catch (error) {
            alert('Erro ao realizar cadastro, tente novamente!');
        }
    }

    return (
        <div className="new-incident">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"></img>

                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um heroi para resolver isso.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041" />
                    Voltar para home
                </Link>
                </section>

                <form>
                    <input
                        type="text"
                        placeholder="Títilo do caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input
                        placeholder="Valor em Reais"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />

                    <button onClick={handleSubmit} className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}