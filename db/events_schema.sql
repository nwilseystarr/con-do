USE con_doDB;

CREATE TABLE events (
    id INT NOT NULL AUTO_INCREMENT, 
    name VARCHAR(50) NOT NULL, 
    date VARCHAR(10) NOT NULL,
    time_start VARCHAR(10) NOT NULL,
    time_end VARCHAR (10) NOT NULL,
    committee VARCHAR (20) NOT NULL, 
    group VARCHAR (20) NOT NULL, 
    location VARCHAR (20) NOT NULL,
	primary key (id)
);
