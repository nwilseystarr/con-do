USE con_doDB;

CREATE TABLE advisors (
    id INT NOT NULL AUTO_INCREMENT, 
    name VARCHAR(50) NOT NULL, 
    email VARCHAR(50) NOT NULL,
    school VARCHAR(50) NOT NULL, 
	primary key (id)
);
