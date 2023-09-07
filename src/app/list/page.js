'use client'
import { useState, useEffect } from "react";
import styles from './styles/list.module.scss'
import axios from "axios";
import Link from 'next/link'
import Image from 'next/image'

export default function List() {

  const [userList, setUserlist] = useState([]);

  const setInitialData = async () => {
    const storedList = JSON.parse(localStorage.getItem('userList')) || []
    if (storedList?.length <= 0) {
      const { data } = await axios.get('https://private-9d65b3-tinnova.apiary-mock.com/users')
      setUserlist(data)
      localStorage.setItem('userList', JSON.stringify(data))
    } else {
      setUserlist(storedList)
    }
  }

  const removeUserFromList = (index) => {
    const storedList = JSON.parse(localStorage.getItem('userList')) || []
    const newList = userList.filter((u, i) => i !== index)
    localStorage.setItem('userList', JSON.stringify(newList))
    setUserlist(newList)
  }

  useEffect(() => {
    setInitialData()
  }, [])

  return (
    <main className={styles.main}>
      <div className={styles.content}>
        {userList.length <= 0 ? (
          <div className={styles.loadingContainer}>
            <Image
              src="/loading.svg"
              alt="Carregando"
              width={100}
              height={100}
              priority
            />
          </div>
        ) : (
          <>
            <ul className={styles.listContainer}>
              {userList?.map((user, index) => (
                <li className={styles.listItem}>
                  <p className={styles.userInfo}>
                    <span>Nome:</span>
                    {user.name && user.name}
                  </p>


                  <p className={styles.userInfo}>
                    <span>CPF:</span>
                    {user.cpf && user.cpf}
                  </p>


                  <p className={styles.userInfo}>
                    <span>Telefone:</span>
                    {user.phone && user.phone}
                  </p>


                  <p className={styles.userInfo}>
                    <span>E-mail:</span>
                    {user.email && user.email}
                  </p>

                  <button className={styles.removeUser} onClick={() => { removeUserFromList(index) }}>
                    <Image
                      src="/delete.svg"
                      alt="Remover"
                      width={20}
                      height={20}
                    />
                  </button>

                </li>
              ))}
            </ul>
            <div className={styles.buttonWrapper}>
              <Link className={styles.button} href="/form">Cadastrar</Link>
              <Link className={styles.button} href="/">Voltar</Link>
            </div>
          </>
        )}
      </div>
    </main>
  )
}
