import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, userAuthKey, usersListStorageKey } from "../../services/api";
import { toast } from "react-toastify";
import "./styles.scss";
import { Link } from "react-router-dom";

export function LoginPage() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    id: `${new Date()}`,
    email: "",
    password: "",
  });

  useEffect(() => {
    const isUserAuth = localStorage.getItem(userAuthKey);

    if (isUserAuth) {
      toast("Você já está autenticado. Redicionando para tela inicial.", {
        type: "info",
        style: {
          color: "#000",
        },
      });

      navigate("/home");
    }
  }, []);

  function handleSignIn(e: any) {
    e.preventDefault();

    if (!user.email) {
      return toast("Por favor, coloque o e-mail para entrar na conta.", {
        type: "error",
        style: {
          color: "#000",
        },
      });
    }

    if (!user.password) {
      return toast("Por favor, coloque a senha para entrar na conta.", {
        type: "error",
        style: {
          color: "#000",
        },
      });
    }

    // Apenas uma simulação, mas aqui seria um envio para o backend e salvar no banco de dados. O mesmo para a locação.

    let users = localStorage.getItem(usersListStorageKey);

    let usersList: User[] = [];

    if (users) {
      usersList = JSON.parse(users);

      const userExist = usersList.find((where) => {
        return where.email === user.email;
      });

      if (!userExist) {
        return toast(
          "Usuário com este e-mail não existe. Tente novamente ou crie uma conta",
          {
            type: "error",
            style: {
              color: "#000",
            },
          }
        );
      }

      if (
        userExist.password !== user.password ||
        userExist.email !== user.email
      ) {
        return toast("E-mail ou senha incorreta. Tente novamente", {
          type: "error",
          style: {
            color: "#000",
          },
        });
      }

      localStorage.setItem(userAuthKey, JSON.stringify(userExist));

      toast("Login feito com sucesso!", {
        type: "success",
        style: {
          color: "#000",
        },
      });

      return setTimeout(() => {
        navigate("/home");
      }, 2000);
    }

    return toast(
      "Usuário com este e-mail não existe. Tente novamente ou crie uma conta",
      {
        type: "error",
        style: {
          color: "#000",
        },
      }
    );
  }

  return (
    <div className="login_container">
      <main>
        <form onSubmit={handleSignIn}>
          <header>
            <h2 className="logo">@gendei</h2>
            <h3>Faça login na plataforma</h3>
          </header>

          <div className="form_content">
            <div className="inputs">
              <div className="input_container">
                <label htmlFor="input_email">E-mail</label>
                <input
                  id="input_email"
                  type="text"
                  onChange={(e) =>
                    setUser((prevState) => {
                      return {
                        ...prevState,
                        email: e.target.value,
                      };
                    })
                  }
                />
              </div>

              <div className="input_container">
                <label htmlFor="input_password">Senha</label>
                <input
                  id="input_password"
                  type="password"
                  onChange={(e) =>
                    setUser((prevState) => {
                      return {
                        ...prevState,
                        password: e.target.value,
                      };
                    })
                  }
                />
              </div>
            </div>
            <button className="signIn_btn" type="submit">
              Entrar na conta
            </button>
            <p className="redirect_to_register">
              Não possuí uma conta?
              <Link to="/register">Crie agora mesmo</Link>
            </p>
          </div>
        </form>
      </main>
    </div>
  );
}
