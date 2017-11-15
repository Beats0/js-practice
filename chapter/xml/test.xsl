<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:output method="html"/>
    <xsl:param name="massage"/>

    <xsl:template match="/">
        <ul>
            <xsl:apply-templates select="*"/>
        </ul>
        <p>Messge:<xsl:value-of select="$massage"/></p>
    </xsl:template>

    <xsl:template match="employee">
        <li>
            <xsl:value-of select="name"/>

            <em><xsl:value-of select="@title"/></em>
        </li>
    </xsl:template>


</xsl:stylesheet>