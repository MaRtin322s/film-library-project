import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import styles from "./styles/profile.module.css";
import * as service from "../../services/filmService";
import ProfileFilmItem from "./ProfileFilmItem";

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [films, setFilms] = useState([]);

    useEffect(() => {
        service.getAll()
            .then(result => {
                setFilms(result);
            })
    }, []);

    return (
        <section>
            <h1 className={styles["welcome-user"]}>Full Name: {`${user.firstName} ${user.lastName}`}</h1>
            <h1 className={styles["welcome-user-email"]}>Email: {user.email}</h1>

            <article className={styles["user-publications"]}>
                <ul className={styles["created-publications"]} role={"list"}>
                <h3 className={styles["headings"]}>Created publications:</h3>
                    {films.length > 0
                        ?
                        films.map(film => (
                            <li key={film._id}>
                                <ProfileFilmItem {...film} />
                            </li>
                        ))
                        :
                        <h3 className={styles["headings-created"]}>There are no created publications.</h3>
                    }
                </ul>
                <ul className={styles["shared-publications"]} role={"list"}>
                <h3 className={styles["headings"]}>Shared publications:</h3>
                <h3 className={styles["headings-shared"]}>There are no shared publications.</h3>    
                </ul>
            </article>
        </section>
    );
}

export default Profile;