CREATE TABLE `stat_ref` (
  `id` varchar(128) NOT NULL DEFAULT '',
  `ref` varchar(300) DEFAULT '',
  `http1` int(11) DEFAULT '0',
  `spdy2` int(11) DEFAULT '0',
  `spdy3` int(11) DEFAULT '0',
  `spdy3_1` int(11) DEFAULT '0',
  `http2` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `statistics` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `hash_id` varchar(128) DEFAULT '',
  `agent_name` varchar(300) DEFAULT '',
  `agent_version` varchar(150) DEFAULT '',
  `os_name` varchar(150) DEFAULT '',
  `os_version` varchar(300) DEFAULT '',
  `is_spdy` int(2) DEFAULT '0',
  `protocol` varchar(30) DEFAULT '',
  `ctr` int(11) DEFAULT '0',
  `ua_string` varchar(1500) DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=246 DEFAULT CHARSET=utf8;
