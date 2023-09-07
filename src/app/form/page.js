'use client'
import { useState, useEffect } from "react";
import styles from './styles/form.module.scss'
import axios from "axios";
import Link from 'next/link'
import * as yup from 'yup';
import { isValidCPF } from '@brazilian-utils/brazilian-utils';
import { Formik, Form, Field, ErrorMessage } from "formik";

export default function List() {

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .min(3, "Campo deve conter 3 caracteres ou mais")
      .required("Campo obrigatório"),
    email: yup
      .string()
      .email("Formato de E-mail inválido")
      .required("Campo obrigatório"),
    cpf: yup
      .number()
      .test(
        'test-valid-cpf',
        'CPF inválido',
        (cpf) => !isValidCPF(cpf))
      .required("Campo obrigatório"),
    phone: yup
      .string()
      .min(10)
      .max(11)
      .required("Campo obrigatório"),
  });

  const initialFormData = {
    name: null,
    email: null,
    cpf: null,
    phone: null
  }

  const [userFormData, setUserFormData] = useState(initialFormData);

  // const setInitialData = async () => {
  //   const storedList = JSON.parse(localStorage.getItem('userList')) || []
  //   if (storedList?.length <= 0) {
  //     const { data } = await axios.get('https://private-9d65b3-tinnova.apiary-mock.com/users')
  //     setUserlist(data)
  //     localStorage.setItem('userList', JSON.stringify(data))
  //   } else {
  //     setUserlist(storedList)
  //   }
  // }

  // useEffect(() => {
  //   setInitialData()
  // }, [])

  const renderError = (message) => <span className={styles.fieldError}>{message}</span>;

  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <Formik
          initialValues={initialFormData}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm }) => {
            await onSubmit(values);
            resetForm();
          }}
        >
          <Form>
              <div className="field">
                <label className="label" htmlFor="name">
                  Nome completo (sem abreviações)
                </label>
                <div className="control">
                  <Field
                    name="name"
                    type="text"
                    className="input"
                  />
                  <ErrorMessage name="name" render={renderError} />
                </div>
              </div>
              <div className="field">
                <label className="label" htmlFor="name">
                  CPF
                </label>
                <div className="control">
                  <Field
                    name="cpf"
                    type="tel"
                    className="input"
                    max={11}
                  />
                  <ErrorMessage name="cpf" render={renderError} />
                </div>
              </div>
              <button type="submit" className="button is-primary">
                Submit
              </button>
            </Form>
        </Formik>
      </div>
    </main>
  )


}
