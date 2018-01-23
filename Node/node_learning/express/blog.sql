/*
 Navicat MySQL Data Transfer

 Source Server         : Beats0_pc
 Source Server Type    : MySQL
 Source Server Version : 50720
 Source Host           : localhost:3306
 Source Schema         : blog

 Target Server Type    : MySQL
 Target Server Version : 50720
 File Encoding         : 65001

 Date: 23/01/2018 17:30:52
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for article_table
-- ----------------------------
DROP TABLE IF EXISTS `article_table`;
CREATE TABLE `article_table`  (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `author` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `author_avatar` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `title` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `post_time` int(11) NOT NULL,
  `content` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `summary` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `n_like` int(10) NULL DEFAULT NULL,
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of article_table
-- ----------------------------
INSERT INTO `article_table` VALUES (1, 'Beats0', 'images/001_header.jpg', 'Node.js', 1516518855, 'Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境。 \r\nNode.js 使用了一个事件驱动、非阻塞式 I/O 的模型，使其轻量又高效。 \r\nNode.js 的包管理器 npm，是全球最大的开源库生态系统。', 'Node.js简介', 233);
INSERT INTO `article_table` VALUES (2, 'Node.js', 'images/001_header.jpg', 'Node.js v8.9.3 文档', 1516519283, 'crypto (加密)\r\ncrypto (加密)#\r\n查看英文版 / 查看英文md文件 / 编辑中文md文件\r\n\r\n稳定性: 2 - 稳定的\r\ncrypto 模块提供了加密功能，包含对 OpenSSL 的哈希、HMAC、加密、解密、签名、以及验证功能的一整套封装。\r\n\r\n使用 require(\'crypto\') 来访问该模块。\r\n\r\nconst crypto = require(\'crypto\');\r\n\r\nconst secret = \'abcdefg\';\r\nconst hash = crypto.createHmac(\'sha256\', secret)\r\n                   .update(\'I love cupcakes\')\r\n                   .digest(\'hex\');\r\nconsole.log(hash);\r\n// Prints:\r\n//   c0fa1bc00531bd78ef38c628449c5102aeabd49b5dc3a2a516ea6ea959d6658e\r\nDetermining if crypto support is unavailable#\r\n查看英文版 / 查看英文md文件 / 编辑中文md文件\r\n\r\n可以在不包括支持 crypto 模块的情况下构建 Node.js, 这时, 调用 require(\'crypto\') 将 导致抛出异常.\r\n\r\nlet crypto;\r\ntry {\r\n  crypto = require(\'crypto\');\r\n} catch (err) {\r\n  console.log(\'不支持 crypto!\');\r\n}\r\nClass: Certificate#\r\n查看英文版 / 查看英文md文件 / 编辑中文md文件\r\n\r\n新增于: v0.11.8\r\nSPKAC 最初是由 Netscape 实现的一种证书签名请求机制, 现在正式成为 HTML5\'s keygen element 的一部分.\r\n\r\ncrypto 模块提供 Certificate 类用于处理 SPKAC 数据. 最普遍的用法是处理 HTML5 keygen 元素 产生的输出. Node.js 内部使用 OpenSSL\'s SPKAC implementation 处理.\r\n\r\nnew crypto.Certificate()#\r\n查看英文版 / 查看英文md文件 / 编辑中文md文件\r\n\r\n可以使用 new 关键字或者调用 crypto.Certificate() 方法创建 Certificate 类的实例:\r\n\r\nconst crypto = require(\'crypto\');\r\n\r\nconst cert1 = new crypto.Certificate();\r\nconst cert2 = crypto.Certificate();\r\ncertificate.exportChallenge(spkac)#\r\n查看英文版 / 查看英文md文件 / 编辑中文md文件\r\n\r\n新增于: v0.11.8\r\nspkac <string> | <Buffer> | <TypedArray> | <DataView>\r\n返回 <Buffer> 返回 spkac 数据结构的 challenge 部分，spkac 包含一个公钥和一个 challange。\r\nconst cert = require(\'crypto\').Certificate();\r\nconst spkac = getSpkacSomehow();\r\nconst challenge = cert.exportChallenge(spkac);\r\nconsole.log(challenge.toString(\'utf8\'));\r\n// Prints: the challenge as a UTF8 string\r\ncertificate.exportPublicKey(spkac)#\r\n查看英文版 / 查看英文md文件 / 编辑中文md文件\r\n\r\n新增于: v0.11.8\r\nspkac <string> | <Buffer> | <TypedArray> | <DataView>\r\n返回 <Buffer> 数据结构的公钥部分，spkac 包含一个公钥和一个 challange。\r\nconst cert = require(\'crypto\').Certificate();\r\nconst spkac = getSpkacSomehow();\r\nconst publicKey = cert.exportPublicKey(spkac);\r\nconsole.log(publicKey);\r\n// Prints: the public key as <Buffer ...>\r\ncertificate.verifySpkac(spkac)#\r\n查看英文版 / 查看英文md文件 / 编辑中文md文件\r\n\r\n新增于: v0.11.8\r\nspkac <Buffer> | <TypedArray> | <DataView>\r\n返回 <boolean> 如果 spkac 数据结构是有效的返回 true，否则返回 false。\r\nconst cert = require(\'crypto\').Certificate();\r\nconst spkac = getSpkacSomehow();\r\nconsole.log(cert.verifySpkac(Buffer.from(spkac)));\r\n// Prints: true 或者 false\r\nClass: Cipher#\r\n查看英文版 / 查看英文md文件 / 编辑中文md文件\r\n\r\n新增于: v0.1.94\r\nCipher类的实例用于加密数据。这个类可以用在以下两种方法中的一种:\r\n\r\n作为stream，既可读又可写，未加密数据的编写是为了在可读的方面生成加密的数据，或者\r\n使用cipher.update()和cipher.final()方法产生加密的数据。\r\ncrypto.createCipher()或crypto.createCipheriv()方法用于创建Cipher实例。Cipher对象不能直接使用new关键字创建。\r\n\r\n示例:使用Cipher对象作为流:\r\n\r\nconst crypto = require(\'crypto\');\r\nconst cipher = crypto.createCipher(\'aes192\', \'a password\');\r\n\r\nlet encrypted = \'\';\r\ncipher.on(\'readable\', () => {\r\n  const data = cipher.read();\r\n  if (data)\r\n    encrypted += data.toString(\'hex\');\r\n});\r\ncipher.on(\'end\', () => {\r\n  console.log(encrypted);\r\n  // Prints: ca981be48e90867604588e75d04feabb63cc007a8f8ad89b10616ed84d815504\r\n});\r\n\r\ncipher.write(\'some clear text data\');\r\ncipher.end();\r\n示例:使用Cipher和管道流:\r\n\r\nconst crypto = require(\'crypto\');\r\nconst fs = require(\'fs\');\r\nconst cipher = crypto.createCipher(\'aes192\', \'a password\');\r\n\r\nconst input = fs.createReadStream(\'test.js\');\r\nconst output = fs.createWriteStream(\'test.enc\');\r\n\r\ninput.pipe(cipher).pipe(output);\r\n示例:使用cipher.update()和cipher.final()方法:\r\n\r\nconst crypto = require(\'crypto\');\r\nconst cipher = crypto.createCipher(\'aes192\', \'a password\');\r\n\r\nlet encrypted = cipher.update(\'some clear text data\', \'utf8\', \'hex\');\r\nencrypted += cipher.final(\'hex\');\r\nconsole.log(encrypted);\r\n// Prints: ca981be48e90867604588e75d04feabb63cc007a8f8ad89b10616ed84d815504\r\ncipher.final([outputEncoding])#\r\n查看英文版 / 查看英文md文件 / 编辑中文md文件\r\n\r\n新增于: v0.1.94\r\noutputEncoding <string>\r\n返回任何加密的内容。如果 outputEncoding 参数是\'latin1\', \'base64\' 或者 \'hex\'，返回字符串。 如果没有提供 outputEncoding，则返回Buffer。\r\n\r\n一旦cipher.final()方法已被调用，Cipher 对象就不能再用于加密数据。如果试图再次调用cipher.final()，将会抛出一个错误。\r\n\r\ncipher.setAAD(buffer)#\r\n查看英文版 / 查看英文md文件 / 编辑中文md文件\r\n\r\n新增于: v1.0.0\r\nbuffer <Buffer>\r\n返回<Cipher>方法链。\r\n当使用经过验证的加密模式(目前只支持GCM)时，cipher.setAAD()方法设置用于additional authenticated data(附加验证的data(AAD))输入参数的值。\r\n\r\ncipher.setAAD()法必须在cipher.update()之前调用。\r\n\r\ncipher.getAuthTag()#\r\n查看英文版 / 查看英文md文件 / 编辑中文md文件\r\n\r\n新增于: v1.0.0\r\n当使用经验证的加密模式时(目前只有GCM支持),cipher.getAuthTag()方法返回一个Buffer，此Buffer包含已从给定数据计算后的authentication tag。 cipher.getAuthTag()方法只能在使用cipher.final()方法完全加密后调用。\r\n\r\ncipher.setAutoPadding([autoPadding])#\r\n查看英文版 / 查看英文md文件 / 编辑中文md文件\r\n\r\n新增于: v0.7.1\r\nautoPadding <boolean> 默认为 true.\r\n返回<Cipher>方法链。\r\n当使用块加密算法时，Cipher类会自动添加padding到输入数据中，来适配相应块大小。可调用cipher.setAutoPadding(false)禁用默认padding。\r\n\r\n当autoPadding是false时，整个输入数据的长度必须是cipher块大小的倍数，否则cipher.final()将抛出一个错误。 禁用自动填充对于非标准填充是有用的，例如使用0x0代替PKCS填充。\r\n\r\ncipher.setAutoPadding()必须在cipher.final()之前被调用。\r\n\r\ncipher.update(data[, inputEncoding][, outputEncoding])#\r\n查看英文版 / 查看英文md文件 / 编辑中文md文件\r\n\r\n版本历史\r\ndata <string> | <Buffer> | <TypedArray> | <DataView>\r\ninputEncoding <string>\r\noutputEncoding <string>\r\n用data更新密码。如果给出了inputEncoding的论证，它的值必须是\'utf8\', \'ascii\', 或者\'latin1\'，而data参数是使用指定编码的字符串。如果不给出inputEncoding的参数，则data必须是Buffer，TypedArray， 或者DataView。如果data是一个Buffer，TypedArray， 或者 DataView， 那么inputEncoding就被忽略了。\r\n\r\noutputEncoding指定了加密数据的输出格式，可以是\'latin1\'， \'base64\' 或者 \'hex\'。如果指定了outputEncoding，则返回使用指定编码的字符串。如果没有outputEncoding被提供，会返回Buffer。\r\n\r\ncipher.update()方法可以用新数据多次调用，直到cipher.final()被调用。 [\' cipher.final()\'][]。在cipher.final()之后调用cipher.update()将抛出错误。\r\n\r\nClass: Decipher#\r\n查看英文版 / 查看英文md文件 / 编辑中文md文件\r\n\r\n新增于: v0.1.94\r\nDecipher类的实例用于解密数据。这个类可以用在以下两种方法中的一种:\r\n\r\n作为stream，既可读，又可写，加密数据的编写是为了在可读的方面生成未加密的数据\r\n使用decipher.update()和decipher.final()方法产生未加密的数据。\r\ncrypto.createDecipher()或crypto.createDecipheriv()的方法 用于创建Decipher实例。Decipher对象不能直接使用new关键字创建。\r\n\r\n示例:使用Decipher对象作为流:\r\n\r\nconst crypto = require(\'crypto\');\r\nconst decipher = crypto.createDecipher(\'aes192\', \'a password\');\r\n\r\nlet decrypted = \'\';\r\ndecipher.on(\'readable\', () => {\r\n  const data = decipher.read();\r\n  if (data)\r\n    decrypted += data.toString(\'utf8\');\r\n});\r\ndecipher.on(\'end\', () => {\r\n  console.log(decrypted);\r\n  // Prints: some clear text data\r\n});\r\n\r\nconst encrypted =\r\n    \'ca981be48e90867604588e75d04feabb63cc007a8f8ad89b10616ed84d815504\';\r\ndecipher.write(encrypted, \'hex\');\r\ndecipher.end();\r\n示例:使用Decipher和管道流:\r\n\r\nconst crypto = require(\'crypto\');\r\nconst fs = require(\'fs\');\r\nconst decipher = crypto.createDecipher(\'aes192\', \'a password\');\r\n\r\nconst input = fs.createReadStream(\'test.enc\');\r\nconst output = fs.createWriteStream(\'test.js\');\r\n\r\ninput.pipe(decipher).pipe(output);\r\n示例:使用decipher.update()和decipher.final()方法:\r\n\r\nconst crypto = require(\'crypto\');\r\nconst decipher = crypto.createDecipher(\'aes192\', \'a password\');\r\n\r\nconst encrypted =\r\n    \'ca981be48e90867604588e75d04feabb63cc007a8f8ad89b10616ed84d815504\';\r\nlet decrypted = decipher.update(encrypted, \'hex\', \'utf8\');\r\ndecrypted += decipher.final(\'utf8\');\r\nconsole.log(decrypted);\r\n// Prints: some clear text data\r\ndecipher.final([outputEncoding])', 'crypto (加密)', 234);

-- ----------------------------
-- Table structure for banner_table
-- ----------------------------
DROP TABLE IF EXISTS `banner_table`;
CREATE TABLE `banner_table`  (
  `ID` int(11) NOT NULL,
  `title` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `sub_title` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `src` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of banner_table
-- ----------------------------
INSERT INTO `banner_table` VALUES (1, '博丽灵梦', '《东方Project》', 'images/1.jpg');
INSERT INTO `banner_table` VALUES (2, '初音ミク', 'VOCALOID', 'images/2.jpg');
INSERT INTO `banner_table` VALUES (3, '泉户琥珀', '《游魂2 -you\'re the only one-》', 'images/3.jpg');

-- ----------------------------
-- Table structure for user_table
-- ----------------------------
DROP TABLE IF EXISTS `user_table`;
CREATE TABLE `user_table`  (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `avatar_src` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
