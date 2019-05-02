USE con_doDB;

CREATE TABLE admin_staff (
    id INT NOT NULL AUTO_INCREMENT, 
    name VARCHAR(50) NOT NULL, 
    email VARCHAR(50) NOT NULL,
	primary key (id)
);
