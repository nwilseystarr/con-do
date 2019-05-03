USE con_doDB;

CREATE TABLE committee_staff (
    id INT NOT NULL AUTO_INCREMENT, 
    name VARCHAR(50) NOT NULL, 
    email VARCHAR(50) NOT NULL,
    committee VARCHAR(50) NOT NULL, 
	primary key (id)
);
