'use client'
import { useState, useEffect } from "react";
import styles from './styles/form.module.scss'
import axios from "axios";
import Link from 'next/link'
import Image from 'next/image'
import * as yup from 'yup';
import { isValidCPF } from '@brazilian-utils/brazilian-utils';
import { Formik, Form, Field, ErrorMessage } from "formik";
import MaskedInput from "react-text-mask";
import cx from "classnames";

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
      .string()
      .test(
        'test-valid-cpf',
        'CPF inválido',
        (cpf) => isValidCPF(cpf))
      .required("Campo obrigatório"),
    phone: yup
      .string()
      .required("Campo obrigatório"),
  });

  const initialFormData = {
    name: "",
    cpf: "",
    email: "",
    phone: ""
  }
  const [isLoading, setIsLoading] = useState(false)

  const initUserList = async () => {
    const storedList = JSON.parse(localStorage.getItem('userList')) || []
    if (storedList?.length <= 0) {
      const { data } = await axios.get('https://private-9d65b3-tinnova.apiary-mock.com/users')
      localStorage.setItem('userList', JSON.stringify(data))
    }
  }

  const saveUserInList = (user) => {
    const storedList = JSON.parse(localStorage.getItem('userList')) || []
    storedList.push(user)
    localStorage.setItem('userList', JSON.stringify(storedList))
  }

  useEffect(() => {
    initUserList()
  }, [])

  const renderError = (message) => <span className={styles.fieldError}>{message}</span>;

  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <Formik
          initialValues={initialFormData}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm }) => {
            setIsLoading(true)
            await saveUserInList(values);
            resetForm();
            setIsLoading(false)
          }}
        >
          {({ errors, touched, isValid, values }) => (
            <Form className={styles.form}>
              <div className={styles.inputWrapper}>
                <Field
                  name="name"
                  type="text"
                  value={values.name}
                  className={cx([styles.input, ((errors.name && touched.name) && styles.error), (touched.name && styles.focused)])}
                />
                <label className={styles.label} htmlFor="name">
                  Nome completo (sem abreviações)
                </label>
                <ErrorMessage name="name" render={renderError} />
              </div>

              <div className={styles.inputWrapper}>
                <Field name="cpf">
                  {
                    ({ field }) => <MaskedInput
                      {...field}
                      type="tel"
                      mask={[/[0-9]/, /[0-9]/, /[0-9]/, ".", /[0-9]/, /[0-9]/, /[0-9]/, ".", /[0-9]/, /[0-9]/, /[0-9]/, "-", /[0-9]/, /[0-9]/]}
                      className={cx([styles.input, ((errors.cpf && touched.cpf) && styles.error), (touched.cpf && styles.focused)])}
                    />
                  }
                </Field>
                <label className={styles.label} htmlFor="cpf">
                  CPF
                </label>
                <ErrorMessage name="cpf" render={renderError} />
              </div>
              <div className={styles.inputWrapper}>
                <Field name="phone">
                  {
                    ({ field }) => <MaskedInput
                      {...field}
                      type="tel"
                      mask={["(", /[0-9]/, /[0-9]/, ")", /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, "-", /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/]}
                      className={cx([styles.input, ((errors.phone && touched.phone) && styles.error), (touched.phone && styles.focused)])}
                    />
                  }
                </Field>
                <label className={styles.label} htmlFor="phone">
                  Telefone
                </label>
                <ErrorMessage name="phone" render={renderError} />
              </div>
              <div className={styles.inputWrapper}>
                <Field
                  name="email"
                  type="email"
                  value={values.email}
                  className={cx([styles.input, ((errors.email && touched.email) && styles.error), (touched.email && styles.focused)])}
                />
                <label className={styles.label} htmlFor="email">
                  E-mail
                </label>
                <ErrorMessage name="email" render={renderError} />
              </div>

              <button type="submit" className={cx([styles.button], (isLoading && styles.loading))} disabled={!isValid}>
                {isLoading ? (<Image
                  src="/loading-btn.svg"
                  alt="Carregando"
                  width={33}
                  height={33}
                  priority
                />) : "Cadastrar"}
              </button>
            </Form>
          )}
        </Formik>

        <div className={styles.buttonWrapper}>
          <Link className={styles.button} href="/list">Ver Lista</Link>
          <Link className={styles.button} href="/">Voltar</Link>
        </div>
      </div>
    </main>
  )


}
